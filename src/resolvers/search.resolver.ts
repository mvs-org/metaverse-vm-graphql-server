import { BlockModel } from '../models/block.model'
import { TransactionModel } from '../models/transaction.model'

export const SearchResolver = async (_parent: any, { query, limit }: { query: any, limit: number }) => {
  const blocks = await BlockModel.find({
    hash: new RegExp(`^${query}`)
  }, {}, { limit: limit || 10, lean: true, sort: {number: -1} })
  const txs = await TransactionModel.find({
    hash: new RegExp(`^${query}`)
  }, {}, { limit: limit || 10, lean: true, sort: {blockNumber: -1} })
  return blocks.map((block:any)=>({...block, type: 'block'})).concat(txs.map((tx:any)=>({...tx, type: 'tx'})))
}