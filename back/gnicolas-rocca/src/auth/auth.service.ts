import { Injectable } from '@nestjs/common';
import { CreateUsersDto } from 'src/dtos/CreateUsers.dto';
import { LoginUsersDto } from 'src/dtos/LoginUsers.dto';
import { UsersRepository } from 'src/Users/users.repository';

@Injectable({})
export class AuthService {
  constructor(private usersRepository: UsersRepository) {}

  async signup_app(user: CreateUsersDto) {
    const user_create = await this.usersRepository.sing_up(user);

    return user_create;
  }

  async signin_app(body: LoginUsersDto) {
    const user = await this.usersRepository.sign_in(body.email, body.password);

    return user;
  }
}
