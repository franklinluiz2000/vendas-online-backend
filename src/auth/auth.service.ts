import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { LoginDto } from './dtos/login.dto';
import { UserEntity } from 'src/user/entities/user.entity';
import { NotFoundException } from '@nestjs/common';
import { compare } from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async login(loginDto: LoginDto): Promise<UserEntity> {
    const user: UserEntity | null | undefined = await this.userService
      .findUserByEmail(loginDto.email)
      .catch(() => undefined);

    const isMatch = await compare(loginDto.password, user?.password || '');

    if (!user || !isMatch) {
      throw new NotFoundException(
        `Invalid credentials for email: ${loginDto.email}`,
      );
    }

    return user;
  }
}
