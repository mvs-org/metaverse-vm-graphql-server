import { gql } from 'apollo-server-core'

export const typeDefs = gql`
    type Block {
    id: ID
    hash: String
    gasUsed: Int
    miner: String
    number: Int
    parentHash: String
    size: Int
    timestamp: Int
  }

  type Tx {
    hash: String
    blockHash: String
    blockNumber: Int
    confirmedAt: Int
    creates: String
    from: String
    gas: Int
    gasPrice: Int
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

  type TxReceipt {
    blockHash: String
    blockNumber: Int
    contractAddress: String
    cumulativeGasUsed: Int
    from: String
    gasUsed: Int
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

  type Query {
    block(id: ID!): Block
    blockByNumber(number: Int!): Block
    blocks(query: BlockQuery, limit: Int, offset: Int, sort: String): [Block]
    tx(id: ID!): Tx
    txs(query: TxQuery, limit: Int, offset: Int, sort: String): [Tx]
    price: Price
  }
`