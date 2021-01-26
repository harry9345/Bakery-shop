export class Employee {
  constructor(id: number, name: string, email: string, avatar: URL) {
    this.id = id;
    this.first_name = name;
    this.email = email;
    this.avatar = avatar;
  }

  id: number;
  first_name: string;
  email: string;
  avatar: URL;
}
