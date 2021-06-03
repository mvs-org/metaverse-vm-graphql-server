import Web3 from 'web3'
import { RPC_ENDPOINT } from '../config/config'

console.log(`connect web3 endpoint ${RPC_ENDPOINT}`)

export const web3 = new Web3(RPC_ENDPOINT)