import { ApolloServer, } from 'apollo-server'
import { connect } from 'mongoose'
import { BlocksResolver } from './resolvers/blocks.resolver'
import { BlockByNumberResolver, BlockResolver } from './resolvers/block.resolver'
import { TxResolver } from './resolvers/tx.resolver'
import { TxsResolver } from './resolvers/txs.resolver'
import { typeDefs } from './typedef/typedef'
import { PriceResolver, } from './resolvers/price.resolver'
import { SearchResolver } from './resolvers/search.resolver'
import { MSTInfoResolver, MSTsInfoResolver, MSTTransfersResolver } from './resolvers/mst-transfer.resolver'
import { ApolloLogPlugin } from 'apollo-log'
import { BIND_ADDRESS, BIND_PORT, GQL_ENDPOINT, LOGGING_ENABLED, MONGO_URL } from './config/config'
import { AddressResolver } from './resolvers/address.resolver'
import { ETPBalanceResolver } from './resolvers/balance.resolver'
import { ContractResolver } from './resolvers/contract.resolver'




const plugins = [
  ...(LOGGING_ENABLED ? [ApolloLogPlugin({prefix: 'mvs-vm-ql'})] : [])
]

const resolvers = {
  SearchResult: {
    __resolveType(obj: any, context: any, info: any) {
      switch (obj.type) {
        case 'tx': return 'Tx'
        case 'block': return 'Block'
        default: return null
      }
    },
  },
  Query: {
    block: BlockResolver,
    blockByNumber: BlockByNumberResolver,
    blocks: BlocksResolver,
    contract: ContractResolver,
    tx: TxResolver,
    txs: TxsResolver,
    msts: MSTsInfoResolver,
    mstTransfers: MSTTransfersResolver,
    address: AddressResolver,
    price: PriceResolver,
    search: SearchResolver,
  },
  Address:{
    etpBalance: ETPBalanceResolver,
    mstTransfers: MSTTransfersResolver,
    transactions: TxsResolver,
    contract: ContractResolver,
  },
  Block: {
    transactions: TxsResolver
  },
  MSTTransfer: {
    tokenInfo: MSTInfoResolver,
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins,
  playground: {
    endpoint: GQL_ENDPOINT,
    tabs: [
      { endpoint: GQL_ENDPOINT }
    ],
    settings: {}
  },
})

server.listen(BIND_PORT, BIND_ADDRESS).then(async ({ url }) => {

  await connect(MONGO_URL, { useCreateIndex: true, useUnifiedTopology: true, useNewUrlParser: true })
  console.log('📁  connected to database')
  console.log(`🚀  Server ready at ${url}`)
})