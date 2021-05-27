import { BlockModel } from '../models/block.model'

export const BlockByNumberResolver = async (_parent: any, { number, }: { number: number }) => {
  return await BlockModel.findOne({ number })
}

export const BlockResolver = async (_parent: any, { id, }: { id: string }) => {
  return await BlockModel.findOne({ hash: id })
}