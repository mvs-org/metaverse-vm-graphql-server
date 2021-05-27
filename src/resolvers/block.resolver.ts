import { BlockModel } from '../models/block.model'

export const BlockResolver = async (_parent: any, { id }: { id: String }) => {
  return await BlockModel.findOne({ hash: id })
}