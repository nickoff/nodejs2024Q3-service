import { Injectable } from '@nestjs/common';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class DatabaseService {
  private users: User[] = [];

  getUsers() {
    return this.users;
  }

  updateUser(users: User[]) {
    this.users = [...users];
  }
}
