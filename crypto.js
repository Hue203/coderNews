const API_KEY = "b296263f-91a1-4e0d-bc08-05609f973689";

const cryptoURL = `https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?start=1&limit=5&convert=USD&CMC_PRO_API_KEY=${API_KEY}`;
async function getCryptoPrices() {
  const response = await fetch(cryptoURL);
  const json = await response.json();
  const coin = json.data[0];
  const Etherum = json.data[1];
  const Tether = json.data[2];
  console.log(coin);
  console.log(Etherum);
  console.log(Tether);
  renderLineGraph(coin);
}
getCryptoPrices();
let formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});
const coin = {
  id: 1,
  name: "Bitcoin",
  symbol: "BTC",
  slug: "bitcoin",
  num_market_pairs: 9852,
  date_added: "2013-04-28T00:00:00.000Z",
  tags: [
    "mineable",
    "pow",
    "sha-256",
    "store-of-value",
    "state-channels",
    "coinbase-ventures-portfolio",
    "three-arrows-capital-portfolio",
    "polychain-capital-portfolio",
  ],
  max_supply: 21000000,
  circulating_supply: 18750725,
  total_supply: 18750725,
  platform: null,
  cmc_rank: 1,
  last_updated: "2021-07-08T09:09:02.000Z",
  quote: {
    USD: {
      price: 33145.77528708912,
      volume_24h: 26040679867.62785,
      percent_change_1h: -0.16674976,
      percent_change_24h: -4.6785554,
      percent_change_7d: -3.02305162,
      percent_change_30d: 1.05334167,
      percent_change_60d: -43.2693143,
      percent_change_90d: -43.06485143,
      market_cap: 621507317320.0042,
      last_updated: "2021-07-08T06:44:02.000Z",
    },
  },
};

const Etherum = {
  id: 1027,
  name: "Ethereum",
  symbol: "ETH",
  slug: "ethereum",
  num_market_pairs: 5918,
  date_added: "2015-08-07T00:00:00.000Z",
  tags: [
    "mineable",
    "pow",
    "smart-contracts",
    "ethereum",
    "coinbase-ventures-portfolio",
    "three-arrows-capital-portfolio",
    "polychain-capital-portfolio",
    "binance-labs-portfolio",
    "arrington-xrp-capital",
    "blockchain-capital-portfolio",
    "boostvc-portfolio",
  ],
  max_supply: null,
  circulating_supply: 116605372.374,
  total_supply: 116605372.374,
  platform: null,
  cmc_rank: 2,
  last_updated: "2021-07-08T06:44:02.000Z",
  quote: {
    USD: {
      price: 2219.393482746718,
      volume_24h: 22065135573.453014,
      percent_change_1h: -0.45620207,
      percent_change_24h: -7.01339795,
      percent_change_7d: 0.83910415,
      percent_change_30d: -11.02995642,
      percent_change_60d: -44.1696334,
      percent_change_90d: 6.43062486,
      market_cap: 258793203500.10977,
      last_updated: "2021-07-08T06:44:02.000Z",
    },
  },
};
const Tether = {
  id: 825,
  name: "Tether",
  symbol: "USDT",
  slug: "tether",
  num_market_pairs: 13764,
  date_added: "2015-02-25T00:00:00.000Z",
  tags: [
    "payments",
    "stablecoin",
    "stablecoin-asset-backed",
    "solana-ecosystem",
  ],
  max_supply: null,
  circulating_supply: 62301822762.351685,
  total_supply: 64469767616.826355,
  platform: {
    id: 1027,
    name: "Ethereum",
    symbol: "ETH",
    slug: "ethereum",
    token_address: "0xdac17f958d2ee523a2206206994597c13d831ec7",
  },
  cmc_rank: 3,
  last_updated: "2021-07-08T06:43:09.000Z",
  quote: {
    USD: {
      price: 1.0003930857963,
      volume_24h: 51637141290.008286,
      percent_change_1h: -0.07380239,
      percent_change_24h: 0.0320912,
      percent_change_7d: 0.00406598,
      percent_change_30d: -0.08106202,
      percent_change_60d: 0.04049617,
      percent_change_90d: -0.10984439,
      market_cap: 62326312723.96316,
      last_updated: "2021-07-08T06:43:09.000Z",
    },
  },
};
function renderLineGraph(coin) {
  const ctx = document.getElementById("myChart");
  const price = formatter.format(coin.quote.USD.price);
  console.log("priceeee", price);
  const [ninetyAgoPrice] = getHistoricPrices(coin.quote.USD);
  const timeAgo = ["90d", "60d", "30d", "7d", "24h", "1h", "Current"];
  const myChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: timeAgo,
      datasets: [
        {
          label: "Bitcoin",
          borderWidth: 1,
          data: getHistoricPrices(coin.quote.USD),
          borderColor: "rgba(255, 99, 132, 1)",
          backgroundColor: "rgba(255, 99, 132, 0.2)",
        },
        {
          label: "Etherum",
          borderWidth: 1,
          data: getHistoricPrices(Etherum.quote.USD),
          borderColor: "blue",
          backgroundColor: "green",
        },
        {
          label: "Tether",
          borderWidth: 1,
          data: getHistoricPrices(Tether.quote.USD),
          borderColor: "orange",
          backgroundColor: "green",
        },
      ],
    },
    options: {
      tooltips: {
        enabled: true,
        mode: "nearest",
      },
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: false,
              suggestedMax: price,
              suggestedMin: ninetyAgoPrice,
            },
          },
        ],
      },
    },
  });
}

function getHistoricPrices(prices) {
  const {
    percent_change_90d,
    percent_change_60d,
    percent_change_30d,
    percent_change_7d,
    percent_change_24h,
    percent_change_1h,
    price,
  } = prices;

  const ninetyAgoPrice = calculatePriceFromPercentageChange(
    price,
    percent_change_90d
  );
  const sixtyAgoPrice = calculatePriceFromPercentageChange(
    price,
    percent_change_60d
  );
  const thirtyAgoPrice = calculatePriceFromPercentageChange(
    price,
    percent_change_30d
  );
  const sevenAgoPrice = calculatePriceFromPercentageChange(
    price,
    percent_change_7d
  );
  const dayAgoPrice = calculatePriceFromPercentageChange(
    price,
    percent_change_24h
  );
  const hourAgoPrice = calculatePriceFromPercentageChange(
    price,
    percent_change_1h
  );

  return [
    ninetyAgoPrice,
    sixtyAgoPrice,
    thirtyAgoPrice,
    sevenAgoPrice,
    dayAgoPrice,
    hourAgoPrice,
    price,
  ];
}
function calculatePriceFromPercentageChange(currentPrice, percentageChange) {
  let denominator;
  let historicPrice;
  if (percentageChange >= 100) {
    percentageChange = percentageChange + 100;
    denominator = percentageChange * 0.01;
    historicPrice = currentPrice / denominator;
  }

  if (percentageChange < 100 && percentageChange > 0) {
    denominator = 1 + percentageChange / 100;
    historicPrice = currentPrice / denominator;
  }

  if (percentageChange < 0) {
    const original = (currentPrice / (100 + percentageChange)) * 100;
    historicPrice = original;
  }
  return historicPrice;
}
