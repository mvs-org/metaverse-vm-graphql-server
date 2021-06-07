import { ContractModel } from '../models/contracts.model'
import { TransactionModel } from '../models/transaction.model'

export const ContractResolver = async (parent: { address?: string } = {}, { address }: { address?: string } = {}) => {
  if (address === undefined) {
    if (parent.address) {
      address = parent.address
    } else {
      throw Error('parent contractId or argument contractId must be provided')
    }
  }

  const creationTransaction = await TransactionModel.findOne(
    { creates: address, 'receipt.status': true },
    {},
    { lean: 1, collation: { locale: "en", strength: 2 } },
  )

  if (creationTransaction == null) {
    return null
  }

  // load contract metadata from contract collection
  const contractInfo = await ContractModel.findOne(
    {
      address,
    },
    {},
    {
      collation: { locale: "en", strength: 2 },
      lean: 1,
    })

  return {
    ...(contractInfo || {}),
    ...(contractInfo && contractInfo.abi && {
      abi: JSON.stringify(contractInfo.abi),
    }),
    address,
    creationTransaction,
  }
}