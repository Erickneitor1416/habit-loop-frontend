export class HabitNotCreated extends Error {
  constructor(message?: string) {
    const errorMessage =
      'Failed to save habit' + (message ? ': ' + message : '');
    super(errorMessage);
    this.name = 'HabitException';
  }
}
