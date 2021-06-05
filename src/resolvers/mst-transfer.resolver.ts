import { fromLogTopic, toLogTopic } from '../models/address.model'
import { LogModel } from '../models/log.model'
import { MST_CONTRACTS, MST_CONTRACTS_MAP } from '../models/mst.model'

export const MSTsInfoResolver = () => {
  return MST_CONTRACTS
}

export const MSTInfoResolver = (parent: any = {}) => {
  return MST_CONTRACTS_MAP[parent.contractId]
}

export const MSTTransfersResolver = (parent: { address?: string } = {}, { query = {}, limit, offset, sort, }: { query: any, limit: number, offset: number, sort: 'desc' | 'asc' }) => {
  const address = query.address || parent.address
  const q = {
    // Only known contract addresses
    "address": { $in: MST_CONTRACTS.map(contract => contract.address) },
    // Event Transfer(address from, address to, uint256 value)
    "topics.0": '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef',
    ...(address && {
      $or: [
        {
          "topics.1": toLogTopic(address.toLowerCase()),
        },
        {
          "topics.2": toLogTopic(address.toLowerCase()),
        },
      ]
    }),
    ...((query.blockNumber_gte || query.blockNumber_lte) && {
      blockNumber: {
        ...(query.blockNumber_gte && { $gte: query.blockNumber_gte }),
        ...(query.blockNumber_lte && { $lte: query.blockNumber_lte }),
      }
    }),
  }
  return LogModel.aggregate([
    {
      $match: q,
    },
    { $skip: offset || 0 },
    { $limit: limit || 5 },
    {
      $lookup: {
        from: "tx",
        localField: "transactionHash",
        foreignField: "hash",
        as: "transaction"
      }
    },
    {
      $project: {
        _id: 0,
        logIndex: 1,
        address: 1,
        topics: 1,
        data: 1,
        blockHash: 1,
        blockNumber: 1,
        transactionHash: 1,
        transactionIndex: 1,
        confirmedAt: { $arrayElemAt: ["$transaction.confirmedAt", 0] },
      }
    }
  ]).collation({
    locale: "en",
    strength: 2
  })
    // return LogModel.find(q, {}, {
    //   limit: limit || 5,
    //   skip: offset || 0,
    //   sort: { blockNumber: sort == 'desc' ? -1 : 1 },
    //   lean: 1,
    //   collation: {
    //     locale: "en",
    //     strength: 2
    //   }
    // })
    .then((logs: any) => logs.map((log: any) => ({
      ...log,
      from: fromLogTopic(log.topics[1]),
      to: fromLogTopic(log.topics[2]),
      value: BigInt(log.data).toString(),
      contractId: log.address,
    })))
}