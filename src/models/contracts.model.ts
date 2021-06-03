import { keyBy } from 'lodash'

export const CONTRACTS = [
    require('../../contracts/gene-mst.json'),
    require('../../contracts/wetp-mst.json'),
    require('../../contracts/dna-mst.json'),
    require('../../contracts/usdt-mst.json'),
    require('../../contracts/sks-mst.json'),
].map(contract=>({
    ...contract,
    abi: JSON.stringify(contract.abi)
}))

export const CONTRACTS_MAP = keyBy(CONTRACTS, 'address')