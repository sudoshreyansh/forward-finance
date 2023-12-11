
![chain-1](https://github.com/sudoshreyansh/forward-finance/assets/44190883/588d9956-1d08-4128-afbd-7580ae6fe047)

## Inspiration
Leverage is a powerful investment tool. It increases your exposure in the market and helps get better returns. But Leverage in cryptocurrencies doesn't work that well. Cryptocurrencies are fundamentally very volatile and using leverage just amplifies this, making it very difficult to invest.
Stop loss and targets do exist but in high volatility scenarios, a lot of times situations can invert from hitting stop loss to reaching more than the target.
Forward aims to be an improvement by solving this issue.

## What it does
Forward Contract introduces a transformation curve which can be any user-defined mathematical function. This curve transforms the price variations of the underlying asset into a more desirable curve. Depending on the investor, the curve can reduce the volatility allowing a safer bet, or it can set checkpoints in the price variation for calculated risk or it can equate to the impermanent loss of AMMs for efficient hedging.  With this strategy, investments in meme coins and other very high volatile assets also becomes possible.

The transformation curve is essentially a smart contract which calculates the value of the transformation curve given the inputs. So anyone can deploy their own curves and start using them.


## How we built it
The architecture is mostly a frontend connected to a collection of smart contracts and user-defined curves. The Chainlink Automation infrastructure is the major entity in the collaboration between the smart contracts and the executions of the trades. It does matchmaking, liquidation and expiration checks, both on and off-chain.

## Accomplishments that we're proud of
We have a fully functional on-chain order-book based derivatives DEX for Forward contracts.

## What's next for Forward Finance
We plan to move ahead and bring Forward to production!