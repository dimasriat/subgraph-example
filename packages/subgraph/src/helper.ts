import { BigInt } from '@graphprotocol/graph-ts';
import { Counter, User } from './types/schema';

export let ZERO_BI = BigInt.fromI32(0);
export let ONE_BI = BigInt.fromI32(1);
export let ADDRESS_ZERO = '0x';

export function getOrCreateCounter(counterAddress: string): Counter {
  let id = counterAddress;
  let counter = Counter.load(id);

  if (counter === null) {
    counter = new Counter(id);

    counter.creator = ADDRESS_ZERO;
    counter.count = ZERO_BI;

    counter.save();
  }

  return counter;
}

export function getOrCreateUser(userAddress: string): User {
  let id = userAddress;
  let user = User.load(id);

  if (user === null) {
    user = new User(id);

    user.save();
  }

  return user;
}
