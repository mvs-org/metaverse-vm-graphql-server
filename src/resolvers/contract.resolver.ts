import { ContractModel } from '../models/contracts.model'
import { TransactionModel } from '../models/transaction.model'
import { utils } from 'ethers'
import Cache from 'node-cache'
import { LogModel } from '../models/log.model'

const abiCache = new Cache({ stdTTL: 3600, checkperiod: 600 })

export const ContractResolver = async (parent: { address?: string } = {}, { address }: { address?: string } = {}) => {
  if (address === undefined) {
    if (parent.address) {
      address = parent.address
    } else {
      throw Error('parent contractId or argument contractId must be provided')
    }
  }

  const creationTransaction = await TransactionModel.findOne(
    { creates: address, 'receipt.status': true },
    {},
    { lean: 1, collation: { locale: "en", strength: 2 } },
  )

  if (creationTransaction == null) {
    return null
  }

  // load contract metadata from contract collection
  const contractInfo = await ContractModel.findOne(
    {
      address,
    },
    {},
    {
      collation: { locale: "en", strength: 2 },
      lean: 1,
    })

  return {
    ...(contractInfo || {}),
    ...(contractInfo && contractInfo.abi && {
      abi: JSON.stringify(contractInfo.abi),
    }),
    address,
    creationTransaction,
  }
}

export const LogsResolver = async (
  parent: { address?: string },
  { address, topic, query, limit, offset }: { offset?: number, limit?: number, address?: string, topic?: string, query?: { blockNumber_gte?: number, blockNumber_lte?: number } }
) => {

  if(query===undefined){
    query = {}
  }

  if (parent && parent.address) {
    address = parent.address
  }

  if (!offset || offset < 0) {
    offset = 0
  }

  if (!limit || limit < 0) {
    limit = 25
  }

  const logs = await LogModel.find(
    {
      address,
      ...(topic && { "topics.0": topic }),
      ...((query.blockNumber_gte || query.blockNumber_lte) && {
        blockNumber: {
          ...(query.blockNumber_gte && { $gte: query.blockNumber_gte }),
          ...(query.blockNumber_lte && { $lte: query.blockNumber_lte }),
        }
      })
    },
    {},
    {
      limit,
      skip: offset,
      sort: { blockNumber: -1 },
      lean: 1,
      collation: { locale: "en", strength: 2 },
    })

  return logs

}

export const DecodedLogResolver = async (parent: { address: string, topics: string[], data: string }) => {
  const address = parent.address

  let abi: any[] | undefined = abiCache.get(address)

  if (abi == null) {
    const contractData = await ContractModel.findOne({ address })
    if (contractData && contractData.abi) {
      abi = contractData.abi
      abiCache.set(address, abi)
    }
  }


  if (abi) {
    const contractInterface = new utils.Interface(abi)
    const decoded = contractInterface.parseLog(parent)
    if (decoded) {
      return {
        name: decoded.name,
        signature: decoded.signature,
        values: decoded.eventFragment.inputs.map((input, index) => ({
          name: input.name,
          type: input.type,
          indexed: input.indexed,
          value: decoded.args[index]
        }))
      }
    }
    return
  }
  return null
}

export const DecodedTxResolver = async (parent: { to: string, input: string }) => {
  const address = parent.to

  if (address == null) {
    return null
  }

  let abi: any[] | undefined = abiCache.get(address)

  if (abi == null) {
    const contractData = await ContractModel.findOne({ address })
    if (contractData && contractData.abi) {
      abi = contractData.abi
      abiCache.set(address, abi)
    }
  }

  if (abi) {
    const contractInterface = new utils.Interface(abi)
    const decoded = contractInterface.parseTransaction({
      data: parent.input
    })
    if (decoded) {
      return {
        name: decoded.name,
        signature: decoded.signature,
        arguments: decoded.functionFragment.inputs.map((input, index) => ({
          name: input.name,
          type: input.type,
          indexed: input.indexed,
          value: decoded.args[index]
        }))
      }
    }
    return
  }
  return null
}