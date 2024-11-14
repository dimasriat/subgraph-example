import { getOrCreateCounter, ONE_BI } from './helper';
import { CounterIncremented as CounterIncrementedEvent } from './types/templates/Counter/Counter';

export function handleCounterIncremented(event: CounterIncrementedEvent): void {
  let counter = getOrCreateCounter(event.address.toHexString());
  counter.count = counter.count.plus(ONE_BI);
  counter.save();
}
