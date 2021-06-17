import { BlockModel } from '../models/block.model'

export const BlockByNumberResolver = async (_parent: any, { number, }: { number: number }) => {
  const block = await BlockModel.findOne({ number })
  if(block){
    block.transactionCount = block.transactions.length
  }
  return block
}

export const BlockResolver = async (_parent: any, { id, }: { id: string }) => {
  const block = await BlockModel.findOne({ hash: id })
  if(block){
    block.transactionCount = block.transactions.length
  }
  return block
}
