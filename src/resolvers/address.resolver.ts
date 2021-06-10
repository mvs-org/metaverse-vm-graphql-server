import { toLogTopic } from '../models/address.model'
import { LogModel } from '../models/log.model'
import { MST_CONTRACT_ADDRESSES, MST_CONTRACTS_MAP } from '../models/mst.model'
import { web3 } from '../models/web3.model'

export const AddressResolver = async (_parent: any = {}, { address }: { address: string }) => {
    return {
        address: web3.utils.toChecksumAddress(address),
    }
}

export const AddressMSTResolver = async (parent: { address?: string } = {}, { address }: { address?: string }) => {
    address = address || parent.address
    if (address == undefined) {
        return null
    }
    const result = await LogModel.aggregate([
        { $match: { address: { $in: MST_CONTRACT_ADDRESSES }, topics: toLogTopic(address) } },
        { $group: { _id: null, addresses: { $addToSet: "$address" } } },
    ]).collation({
        locale: "en",
        strength: 2
    })

    return result.length ? result[0].addresses.map((address: string) => MST_CONTRACTS_MAP[address]) : []
}