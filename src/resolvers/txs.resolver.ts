import { TransactionModel } from '../models/transaction.model'

export const TxsResolver = (parent: { address?: string, hash?: string } = {}, { query, limit, offset, sort, }: { query: any, limit: number, offset: number, sort: 'desc' | 'asc' }) => {
  if (query === undefined) {
    query = {}
  }
  const address = parent.address || query.address
  const q = {
    ...(parent && parent.hash && { blockHash: parent.hash }),
    ...(address && {
      $or: [
        {
          from: address,
        },
        {
          to: address,
        }
      ]
    }),
    ...(query.from && { from: query.from }),
    ...(query.to && { from: query.to }),
    ...((query.blockNumber_gte || query.blockNumber_lte) && {
      blockNumber: {
        ...(query.blockNumber_gte && { $gte: query.blockNumber_gte }),
        ...(query.blockNumber_lte && { $lte: query.blockNumber_lte }),
      }
    }),
  }
  return TransactionModel.find(
    q,
    {},
    {
      limit: limit || 5,
      skip: offset || 0,
      sort: { blockNumber: sort == 'desc' ? -1 : 1 },
      ...(((parent && parent.hash) || query.from || query.to || address) && {
        collation: {
          locale: 'en',
          strength: 2
        }
      }),

    })
}
