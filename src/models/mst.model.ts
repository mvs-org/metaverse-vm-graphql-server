import { keyBy } from 'lodash'

export interface MSTContractData {
    contractId: string
    decimals: number
    symbol: string
    address: string
    logoURI: string
}

export const MST_CONTRACTS = [
    {
        "name": "Metaverse-peg USDT Token",
        "decimals": 6,
        "symbol": "USDT",
        "address": "0x623761F60D677addBD5A07385e037105A13201EF",
        "logoURI": "https://gateway.pinata.cloud/ipfs/Qmchysx7eP2xMn9CvLeiVM4YCjNQGoSKcYq6rY2FUnkdj1",
    },
    {
        "name": "GENE Token",
        "decimals": 18,
        "symbol": "GENE",
        "address": "0xD2aEE12b53895ff8ab99F1B7f73877983729888f",
        "logoURI": "https://gateway.pinata.cloud/ipfs/QmPkhPN9YHtDYNGH6A4ekhL6iAMioPYzH4FXVu1MzhW3sT",
    },
    {
        "name": "Metaverse DNA Chain Token",
        "decimals": 4,
        "symbol": "DNA",
        "address": "0xC35F4BFA9eA8946a3740AdfEb4445396834aDF62",
        "logoURI": "https://gateway.pinata.cloud/ipfs/QmXsbkGShKyBty27ZAqATaAi7rrXR677jELW9Kc3zC7erG",
    },
    {
        "name": "Metaverse ETP Chain Token",
        "decimals": 18,
        "symbol": "WETP",
        "address": "0x757938BBD9a3108Ab1f29628C15d9c8715d2F481",
        "logoURI": "https://gateway.pinata.cloud/ipfs/QmYdQruYGAuDMxuhM3ZhUT3r2YYqKGFbaKDp9PXFuah6jR",
    }
]

export const MST_CONTRACTS_MAP = keyBy(MST_CONTRACTS, 'address')

console.log(MST_CONTRACTS_MAP)