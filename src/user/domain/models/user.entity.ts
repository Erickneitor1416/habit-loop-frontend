export class User {
  constructor(
    public email: string,
    public password: string,
    public name?: string,
    public id?: string,
    access_token?: string,
  ) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
  }
}
