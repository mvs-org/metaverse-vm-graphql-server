import { CONTRACTS_MAP } from '../models/contracts.model'
import { TransactionModel } from '../models/transaction.model'

export const ContractResolver = async (parent: { address?: string } = {}, { address }: { address?: string } = {}) => {
  if (address === undefined) {
    if (parent.address) {
      address = parent.address
    } else {
      throw Error('parent contractId or argument contractId must be provided')
    }
  }

  const createTx = await TransactionModel.findOne(
    { creates: address, 'receipt.status': true },
    {},
    { lean: 1, collation: { locale: "en", strength: 2} },
  )

  if(createTx == null ){
    return null
  }

  const contractInfo = CONTRACTS_MAP[address] || {}

  return{
    ...contractInfo,
    address,
    creationTransaction: createTx,
  }
}