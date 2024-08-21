export abstract class UseCase<I, O> {
  abstract execute(value: I): O | Promise<O>;
}

export abstract class UnitUseCase<I> {
  abstract execute(value: I): void | Promise<void>;
}

export abstract class NullaryUseCase<O> {
  abstract execute(): O | Promise<O>;
}
