// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "hardhat/console.sol";
import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";
import "@chainlink/contracts/src/v0.8/interfaces/AutomationCompatibleInterface .sol";

contract MatchMaker is AutomationCompatibleInterface  {
  AggregatorV3Interface internal _tokenPriceFeed;

  struct PendingOrder {
    uint256 marginLow;
    uint256 marginHigh;
    uint160 curve;
    uint256 previous;
    uint256 next;
  }

  struct MatchedOrders {
    uint256 orderA;
    uint256 orderB;
    uint160 curve;
    uint256 margin;
    uint256 price;
  }

  mapping(uint256 => PendingOrder) private _pendingOrders;
  uint256 private _lastOrderId;
  uint256 private _firstOrderId;

  constructor(address feed) {
    _tokenPriceFeed = feed;
    _lastOrderId = 0;
    _firstOrderId = 0;
  }

  function addOrder(
    uint256 id,
    uint256 marginLow,
    uint256 marginHigh,
    uint128 curve
  ) public {
    _pendingOrders[_lastOrderId].next = id;
    _pendingOrders[id] = PendingOrder(marginLow, marginHigh, curve, _lastOrderId, 0);
    _lastOrderId = id;
  }

  function deleteOrder(
    uint256 id
  ) public {
    PendingOrder memory order = _pendingOrders[id];
    _pendingOrders[order.previous].next = order.next;
    delete _pendingOrders[id];
  }

  function checkUpkeep(
        bytes calldata checkData
    )
        external
        view
        override
        returns (bool, bytes memory)
   {
    uint256 firstOrderId = _firstOrderId;
    uint256 lastOrderId = _lastOrderId;

    if ( firstOrderId == 0 ) return;

    uint256 numOrders = 1;

    for ( uint256 i = firstOrderId; i != lastOrderId; ) {
      i = _pendingOrders[i].next;
      numOrders++;
    }

    PendingOrder[] memory pendingOrders = new PendingOrder[](numOrders);
    uint256[] memory orderIds = new uint256[](numOrders);
    
    uint256 z = firstOrderId;
    for ( uint256 i = 0; i < numOrders; i++ ) {
      pendingOrders[i] = _pendingOrders[z];
      orderIds[i] = z;
      z = pendingOrders[i].next;
    }

    MatchedOrders[] memory matchedOrders = new MatchedOrders[](numOrders/2);
    uint256 matchedOrdersIndex = 0;
    (
    /* uint80 roundID */,
    uint256 price,
    /*uint startedAt*/,
    /*uint timeStamp*/,
    /*uint80 answeredInRound*/
    ) = dataFeed.latestRoundData();

    for ( uint256 a = 0; a < numOrders; a++ )  {
      if ( orderIds[a] > 0 ) continue;

      PendingOrder memory orderA = pendingOrders[a];
      uint256 matchingOrderIndex = 0;
      uint256 matchingMargin = 0;

      for ( uint256 b = a+1; b < numOrders; b++ ) {
        if ( orderIds[b] > 0 ) continue;
        PendingOrder memory orderB = pendingOrders[b];

        if ( orderA.curve != orderB.curve ) continue;

        if (( orderB.marginHigh <= orderA.marginHigh && orderB.marginHigh >= orderA.marginLow ) ||
          ( orderB.marginLow <= orderA.marginHigh && orderB.marginLow >= orderA.marginLow )) {
          uint256 candidateMatchingMargin = (orderA.marginHigh > orderB.marginHigh ? orderA.marginHigh : orderB.marginLow);

          if ( candidateMatchingMargin > matchingMargin ) {
            matchingOrderIndex = b;
            matchingMargin = candidateMatchingMargin;
          }
        }
      }

      if ( matchingMargin > 0 ) continue;

      matchedOrders[matchedOrdersIndex] = MatchedOrder(a, matchingOrderIndex, orderA.curve, matchingMargin, price);
      matchedOrdersIndex++;

      orderIds[a] = 0;
      orderIds[matchingOrderIndex] = 0;
    }

    return (true, abi.encode(matchedOrders));
  }

  function performUpkeep(bytes calldata performData) external override {
    (MatchedOrders[] memory orders) = abi.decode(
        performData,
        (MatchedOrders[])
    );

    for ( uint i = 0; i < orders.size(); i++ ) {

    }
  }

}