import { get } from 'superagent'

export const PriceResolver = async (_parent: any, { base }: { base: string }) => {
  const prices = await get('https://api.coingecko.com/api/v3/coins/metaverse-etp?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false')
    .then(response => response.body.market_data)
  return {
    current_USD: prices.current_price.usd,
    current_SATS: prices.current_price.sats,
    change1h_USD: prices.price_change_24h_in_currency.usd,
    change1h_SATS: prices.price_change_percentage_1h_in_currency.sats,
    change24h_USD: prices.price_change_percentage_1h_in_currency.usd,
    change24h_SATS: prices.price_change_24h_in_currency.sats,
    low24h_USD: prices.low_24h.usd,
    low24h_SATS: prices.low_24h.sats,
    high_USD: prices.high_24h.usd,
    high_SATS: prices.high_24h.sats,
  }
}