import { TransactionModel } from '../models/transaction.model'

export const TxsResolver = (_parent: any, { query, limit, offset, sort, }: { query: any, limit: number, offset: number, sort: 'desc'|'asc' }) => {
  const q = query ? {
    ...(query.address && {
      $or: [
        {
          from: query.address,
        },
        {
          to: query.address,
        }
      ]
    }),
    ...(query.from && { from: query.from }),
    ...(query.to && { from: query.to }),
    ...((query.blockNumber_gte || query.blockNumber_lte) && {
      number: {
        ...(query.blockNumber_gte && { $gte: query.blockNumber_gte }),
        ...(query.blockNumber_lte && { $lte: query.blockNumber_lte }),
      }
    }),
  } : {}
  return TransactionModel.find(q, {}, { limit: limit || 5, skip: offset || 0, sort: { blockNumber: sort == 'desc' ? -1 : 1 } })
}