import { config } from 'dotenv'
// load environment
config()

export const GQL_ENDPOINT = process.env.GQL_ENDPOINT || 'http://127.0.0.1:4000/'
export const MONGO_URL = process.env.MONGO_URL || 'mongodb://127.0.0.1:27017/mvm-mainnet'
export const BIND_PORT = process.env.BIND_PORT ? parseInt(process.env.BIND_PORT, 10) : 4000
export const BIND_ADDRESS = process.env.BIND_ADDRESS || '127.0.0.1'
export const RPC_ENDPOINT = process.env.RPC_ENDPOINT || 'ws://127.0.0.1:9944'
export const LOGGING_ENABLED = process.env.LOGGING_ENABLED === 'true'