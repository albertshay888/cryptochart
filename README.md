# cryptochart
Real-time cryptocurrency price table


DEMO: https://albertshay888.github.io/cryptochart/




## Technologies Include
+ React
+ TypeScript (optional)
+ React-table https://react-table.tanstack.com
+ CoinGecko API for real time prices:
https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_de
sc&per_page=100&page=1&sparkline=false

##Product Requirements
+ A single page consisting of the price table for the first 100 coins returned by the API
+ Choose columns to present from available data
+ Include additional columns for:
+ Number of days since the all-time high
+ Percentage of market share (where total market share is the sum of market cap
of first 100 coins)
+ Table should be sortable
+ Table should update in real-time
+ Table should be usable on a mobile phone
