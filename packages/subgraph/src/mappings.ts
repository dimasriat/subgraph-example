import { getOrCreateCounter } from './helper';
import { CounterCreated as CounterCreatedEvent } from './types/counter_factory/CounterFactory';
import { Counter as CounterTemplate } from './types/templates';

export function handleCounterCreated(event: CounterCreatedEvent): void {
  let counterAddress = event.params._counterAddress;
  let counter = getOrCreateCounter(counterAddress.toHexString());

  counter.creator = event.params.creator.toHex();

  counter.save();

  CounterTemplate.create(counterAddress);
}
