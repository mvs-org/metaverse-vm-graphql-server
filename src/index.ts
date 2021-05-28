import { ApolloServer, } from 'apollo-server'
import { connect } from 'mongoose'
import { config } from 'dotenv'
import { BlocksResolver } from './resolvers/blocks.resolver'
import { BlockByNumberResolver, BlockResolver } from './resolvers/block.resolver'
import { TxResolver } from './resolvers/tx.resolver'
import { TxsResolver } from './resolvers/txs.resolver'
import { typeDefs } from './typedef/typedef'
import { PriceResolver, } from './resolvers/price.resolver'

// load environment
config()

const GQL_ENDPOINT = process.env.GQL_ENDPOINT || 'http://127.0.0.1:4000/'
const MONGO_URL = process.env.MONGO_URL || 'mongodb://127.0.0.1:27017/mvm-mainnet'
const BIND_PORT = process.env.BIND_PORT ? parseInt(process.env.BIND_PORT, 10) : 4000
const BIND_ADDRESS = process.env.BIND_ADDRESS || '127.0.0.1'

const resolvers = {
  Query: {
    block: BlockResolver,
    blockByNumber: BlockByNumberResolver,
    blocks: BlocksResolver,
    tx: TxResolver,
    txs: TxsResolver,
    price: PriceResolver,
  },
}

const server = new ApolloServer({ typeDefs, resolvers, playground: { tabs: [{endpoint: GQL_ENDPOINT}]} })

server.listen(BIND_PORT, BIND_ADDRESS).then(async ({ url }) => {

  await connect(MONGO_URL, { useCreateIndex: true, useUnifiedTopology: true, useNewUrlParser: true })
  console.log('📁  connected to database')
  console.log(`🚀  Server ready at ${url}`)
})