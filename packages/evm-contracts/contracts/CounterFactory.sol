// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import {Counter} from "./Counter.sol";

contract CounterFactory {
  event CounterCreated(address creator, address _counterAddress);

  function createCounter() public {
    Counter counter = new Counter();
    emit CounterCreated(msg.sender, address(counter));
  }
}
