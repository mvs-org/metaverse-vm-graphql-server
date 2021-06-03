import Web3 from 'web3'
import { RPC_ENDPOINT } from '../config/config'

console.log(`connect web3 endpoint ${RPC_ENDPOINT}`)
const web3 = new Web3(RPC_ENDPOINT)

export const ETPBalanceResolver = async (parent: {address?: string} = {}, { address }: { address: string }) => {
    const target = address || parent.address
    if(target !== undefined){
        return await web3.eth.getBalance(target)
    }
    return null
}