import { TransactionModel } from '../models/transaction.model'

export const TxResolver = async (_parent: any, { id }: { id: String }) => {
  return await TransactionModel.findOne({ hash: id })
}