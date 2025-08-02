import { Injectable } from '@nestjs/common';
import { User } from './interfaces/user.interface';
import { CreateUserDto } from './dtos/createUser.dto';

@Injectable()
export class UserService {
  private users: User[] = [];

  createUser(createUserDto: CreateUserDto): User {
    return {
      ...createUserDto,
      id: 2,
    };
  }
}
