# Metaverse VM GraphQL Server

Playground is available at [https://vm-explorer.mvs.org/ql/](https://vm-explorer.mvs.org/ql/)

## Setup

Create a .env file based on .env-example. Minimum configuration is the database url.

```
npm install
npm run build
npm start
```

## Examples

### Get block by number:
```
{
  blockByNumber(number:100){
    hash
  }
}
```

### List 10 blocks starting from number 150k
```
{
  blocks(query: {}, limit: 10, offset: 150000) {
    hash
    number
  }
}
```

### List transactions by address
```
{
  txs(query: { address: "0x53AD715c2f5a56CEc7eC30434cAddf0De947CB06"}, limit: 10, offset: 0) {
    hash
    blockHash
    blockNumber
    from
    to
    confirmedAt
    input
  }
}
```

## Licence

MIT License

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE