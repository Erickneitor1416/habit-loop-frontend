export class User {
  constructor(
    public email: string,
    public password: string,
    public name?: string,
  ) {
    this.name = name;
    this.email = email;
    this.password = password;
  }
}
