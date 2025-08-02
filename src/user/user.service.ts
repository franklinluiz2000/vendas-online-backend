import { Injectable } from '@nestjs/common';
import { User } from './interfaces/user.interface';
import { CreateUserDto } from './dtos/createUser.dto';
import { hash } from 'bcrypt';

@Injectable()
export class UserService {
  private users: User[] = [];

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const saltOrRounds = 10;
    const passwordHash = await hash(createUserDto.password, saltOrRounds);

    const newUser: User = {
      ...createUserDto,
      password: passwordHash,
      id: this.users.length + 1, // Simple ID generation
    };

    console.log(passwordHash);
    this.users.push(newUser);

    return {
      ...createUserDto,
      id: 1,
    };
  }

  getAllUsers(): User[] {
    return this.users;
  }
}
