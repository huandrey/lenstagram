import { v4 as uuid } from "uuid";

class User {
  id?: string;
  name: string;
  email: string;
  password: string;
  created_at?: Date;
  updated_at?: Date;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}

export { User };
