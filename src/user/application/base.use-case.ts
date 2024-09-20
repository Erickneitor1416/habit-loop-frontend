export abstract class BaseUseCase<T> {
  constructor(protected readonly repository: T) {}
  abstract execute(data: any): Promise<any>;
}
