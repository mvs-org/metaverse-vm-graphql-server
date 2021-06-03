import { gql } from 'apollo-server-core'

export const typeDefs = gql`
  type Block {
    id: ID
    hash: String
    gasUsed: String
    miner: String
    number: Int
    parentHash: String
    size: Int
    timestamp: Int
    transactions: [Tx!]
  }

  type Tx {
    hash: String
    blockHash: String
    blockNumber: Int
    confirmedAt: Int
    creates: String
    from: String
    gas: String
    gasPrice: String
    input: String
    nonce: Int
    receipt: TxReceipt
    publicKey: String
    raw: String
    to: String
    value: String
  }

  type Log {
    logIndex: Int
    transactionHash: String
    address: String
    blockHash: String
    blockNumber: Int
    data: String
    id: String
    removed: Boolean
    topics: [String]
    transactionIndex: Int
  }

  type MSTTransfer {
    transactionHash: String
    from: String
    to: String
    value: String
    contractId: String
    blockHash: String
    blockNumber: Int
    tokenInfo: MSTInfo
  }

  type MSTInfo {
    address: ID!
    decimals: Int
    symbol: String
    logoURI: String
  }

  type TxReceipt {
    blockHash: String
    blockNumber: Int
    contractAddress: String
    cumulativeGasUsed: String
    from: String
    gasUsed: String
    logs: [Log]
    logsBloom: String
    status: Boolean
    to: String
    transactionHash: String
    transactionIndex: Int
 }

 type Price {
    current_USD: Float
    current_SATS: Float
    change1h_USD: Float
    change1h_SATS: Float
    change24h_USD: Float
    change24h_SATS: Float
    low24h_USD: Float
    low24h_SATS: Float
    high_USD: Float
    high_SATS: Float
 }

 type Address {
   address: ID!
   etpBalance: String
   mstTransfers(limit: Int, offset: Int, sort: String): [MSTTransfer]
   transactions(limit: Int, offset: Int, sort: String): [Tx]
 }

  input BlockQuery {
    hash: String
    number_gte: Int
    number_lte: Int
  }

  input TxQuery {
    hash: String
    blockNumber_gte: Int
    blockNumber_lte: Int
    address: String
    from: String
    to: String
  }

  input MSTQuery {
    blockNumber_gte: Int
    blockNumber_lte: Int
    address: String
  }

  union SearchResult = Tx|Block

  type Query {
    block(id: ID!): Block
    blockByNumber(number: Int!): Block
    blocks(query: BlockQuery, limit: Int, offset: Int, sort: String): [Block]
    tx(id: ID!): Tx
    txs(query: TxQuery, limit: Int, offset: Int, sort: String): [Tx]
    address(address: String): Address
    msts: [MSTInfo]
    mstTransfers(query: MSTQuery, limit: Int, offset: Int, sort: String): [MSTTransfer]
    price: Price
    search(query: String!): [SearchResult]
  }
`