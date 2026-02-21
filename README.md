```
# Trading Microservice (NestJS)

A lightweight NestJS microservice providing:

- GET /gasPrice — Fast Ethereum gas price endpoint (<50ms)
- GET /return/:fromTokenAddress/:toTokenAddress/:amountIn — Off-chain Uniswap V2 swap estimation


Overview

This service interacts with Ethereum mainnet using ethers v6 and performs:

- Gas price retrieval with in-memory caching
- Uniswap V2 swap output calculation using AMM constant-product formula
- Fully off-chain math (no router calls)

The implementation strictly follows assignment constraints.


Architecture

src/
│
├── blockchain/        # Ethereum provider abstraction
├── gas/               # Gas price module
├── uniswap/
│   ├── dto/           # Request validation
│   ├── utils/         # Pure Uniswap math logic
│   └── uniswap.service.ts
│
└── main.ts


Design Principles

- Modular architecture
- Clear separation of concerns
- Pure math logic extracted for testability
- Input validation using class-validator
- Environment validation using joi
- Proper HTTP exception handling
- Logging via Nest Logger


Gas Price Endpoint

GET /gasPrice

Example:
GET http://localhost:3000/gasPrice

Response:
{
  "gasPriceWei": "44876884",
  "gasPriceGwei": "0.044876884"
}

Performance Strategy

- In-memory caching
- TTL = 2 seconds
- First request fetches from RPC
- Subsequent requests return cached value


Uniswap V2 Return Endpoint

GET /return/:fromTokenAddress/:toTokenAddress/:amountIn

Example:
GET http://localhost:3000/return/0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2/1000000

Response:
{
  "pairAddress": "0xB4e16d0168e52d35CaCD2c6185b44281Ec28C9Dc",
  "amountIn": "1000000",
  "amountOut": "508228824896754"
}


Uniswap V2 Math (Off-Chain)

amountOut =
(amountIn * 997 * reserveOut) /
(reserveIn * 1000 + amountIn * 997)

- 0.3% fee included (997/1000 multiplier)
- Reserves fetched directly from Pair contract
- No router or getAmountsOut usage
- Fully off-chain calculation


Environment Configuration

Create a .env file:

RPC_URL=https://eth-mainnet.g.alchemy.com/v2/YOUR_API_KEY

A template is provided in .env.example.


Testing

Run:

npm run test
npm run test:e2e

Includes:
- Unit tests for Uniswap math
- Integration tests for endpoints


Installation

npm install
npm run start

Server runs at:
http://localhost:3000


Technologies Used

- NestJS
- ethers v6
- class-validator
- joi
- Jest
```
