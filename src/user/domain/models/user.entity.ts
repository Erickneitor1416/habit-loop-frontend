export class User {
  constructor(
    public name: string,
    public email: string,
    public password: string,
    public id?: string,
  ) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
  }
}
