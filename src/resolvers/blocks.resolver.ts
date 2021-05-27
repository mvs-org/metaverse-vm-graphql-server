import { BlockModel } from '../models/block.model'

export const BlocksResolver = (_parent: any, { query, limit, offset }: { query: any, limit: number, offset: number }) => {
    const q = query ? {
      ...((query.number_gte || query.number_lte) && {
        number: {
          ...(query.number_gte && { $gte: query.number_gte }),
          ...(query.number_lte && { $lte: query.number_lte }),
        }
      })
    } : {}
    return BlockModel.find(q, {}, { limit: limit || 5, skip: offset || 0 })
  }