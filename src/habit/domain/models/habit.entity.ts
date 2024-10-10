import { Frequency } from './frequency.enum';

export class Habit {
  constructor(
    public readonly name: string,
    public readonly description: string,
    public readonly frequency: Frequency,
    public readonly goal: number,
    public readonly id?: string,
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.frequency = frequency;
    this.goal = goal;
  }
}
