import { BlockModel } from '../models/block.model'

export const BlocksResolver = (_parent: any, { query, limit, offset, sort }: { query: any, limit: number, offset: number, sort: 'desc'|'asc' }) => {
  const q = query ? {
    ...((query.number_gte || query.number_lte) && {
      number: {
        ...(query.number_gte && { $gte: query.number_gte }),
        ...(query.number_lte && { $lte: query.number_lte }),
      }
    })
  } : {}
  return BlockModel.find(q, {}, { limit: limit || 5, skip: offset || 0, sort: { number: sort == 'desc' ? -1 : 1 }, lean: true })
    .then((result: any[])=>result.map(block=>({
      ...block,
      transactionCount: block.transactions.length,
    })))
}
