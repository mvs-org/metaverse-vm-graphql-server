import { web3 } from '../models/web3.model'

export const AddressResolver = async (_parent: any = {}, { address }: { address: string }) => {
    return {
        address: web3.utils.toChecksumAddress(address),
    }
}