import { Schema, model } from 'mongoose'

export const ContractSchema = new Schema({
    address: {
        type: String,
        unique: true,
    },
    abi: Object,
    contractName: String,
    logoURI: String,
    bytecode: String,
    source: String,
    creationTransactionHash: String,
    compiler: {
        name: String,
        version: String
    }
}, {
    collection: 'contract',
    collation: {
        locale: 'en',
        strength: 2,
    },
})

export const ContractModel = model('Contract', ContractSchema)