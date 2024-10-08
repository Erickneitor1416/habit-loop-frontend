export abstract class BaseUseCase<T> {
  constructor(protected readonly repository: T) {}
}
