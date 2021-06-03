import { web3 } from '../models/web3.model'

export const ETPBalanceResolver = async (parent: {address?: string} = {}, { address }: { address: string }) => {
    const target = address || parent.address
    if(target !== undefined){
        try{
            return await web3.eth.getBalance(target)
        } catch(error){
            console.log(error.message)
            return null
        }
    }
    return null
}