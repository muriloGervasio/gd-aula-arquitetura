import { ValueObject } from './value-object';

export abstract class Identifier<T> extends ValueObject<{
  _value: T;
}> {
  constructor(id: T) {
    super({
      _value: id,
    });
  }

  equals(id: Identifier<T>): boolean {
    if (id === null || id === undefined) {
      return false;
    }

    if (!(id instanceof this.constructor)) {
      return false;
    }

    return id.getValue() === this.getValue();
  }
}
