// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Counter {
  uint256 public count;

  event CounterIncremented(uint256 _count);

  function increment() public {
    count += 1;
    emit CounterIncremented(count);
  }
}
