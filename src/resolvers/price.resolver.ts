import { get } from 'superagent'
import Cache from 'node-cache'

const priceCache = new Cache( { stdTTL: 600, checkperiod: 60 } );

export const PriceResolver = async (_parent: any, { base }: { base: string }) => {

  let prices: any = priceCache.get('prices')
  if( prices === undefined ){
    prices = await get('https://api.coingecko.com/api/v3/coins/metaverse-etp?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false')
      .then(response => response.body.market_data)
    priceCache.set('prices', prices)
  }
  return {
    current_USD: prices.current_price.usd,
    current_SATS: prices.current_price.sats,
    change24h_USD: prices.price_change_24h_in_currency.usd,
    change24h_SATS: prices.price_change_24h_in_currency.sats,
    change7d_USD: prices.current_price.usd-prices.current_price.usd/(1+Number(prices.price_change_percentage_7d_in_currency.usd)/100),
    change7d_SATS: prices.current_price.sats-prices.current_price.sats/(1+Number(prices.price_change_percentage_7d_in_currency.sats)/100),
    low24h_USD: prices.low_24h.usd,
    low24h_SATS: prices.low_24h.sats,
    high_USD: prices.high_24h.usd,
    high_SATS: prices.high_24h.sats,
  }
}