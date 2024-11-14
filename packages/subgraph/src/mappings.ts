import { getOrCreateCounter, getOrCreateUser } from './helper';
import { CounterCreated as CounterCreatedEvent } from './types/counter_factory/CounterFactory';
import { Counter as CounterTemplate } from './types/templates';

export function handleCounterCreated(event: CounterCreatedEvent): void {
  let counterAddress = event.params._counterAddress;

  // create the user entity
  let user = getOrCreateUser(event.params.creator.toHex());

  // create the counter entity
  let counter = getOrCreateCounter(counterAddress.toHexString());
  counter.creator = user.id;
  counter.save();

  // create template of the counter indexer
  CounterTemplate.create(counterAddress);
}
