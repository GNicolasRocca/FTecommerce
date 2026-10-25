import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { compare, hash } from 'bcryptjs';
import { CreateUsersDto } from 'src/dtos/CreateUsers.dto';
import { LoginUsersDto } from 'src/dtos/LoginUsers.dto';
import { UsersRepository } from 'src/Users/users.repository';
import { Role } from './roles.enum';
import { JwtService } from '@nestjs/jwt';

@Injectable({})
export class AuthService {
  constructor(
    private usersRepository: UsersRepository,
    private readonly jwtService: JwtService,
  ) {}

  async signup_app(user: CreateUsersDto) {
    const find_email = await this.usersRepository.find_user_email(user.email);

    if (find_email)
      throw new BadRequestException(
        'El email ingresado ya esta enlazado a una cuenta',
      );

    const hashed_password = await hash(user.password, 10);
    if (!hashed_password)
      throw new BadRequestException('La contraseña no pudo ser hasheada');

    const new_user = {
      ...user,
      password: hashed_password,
    };

    const user_create = await this.usersRepository.sing_up(new_user);

    return {
      message: 'Usuario creado correctamente',
      id: user_create.id,
      name: user_create.name,
      email: user_create.email,
      phone: user_create.phone,
      address: user_create.address,
      country: user_create.country,
      city: user_create.city,
    };
  }

  async signin_app(body: LoginUsersDto) {
    const find_email = await this.usersRepository.find_user_email(body.email);

    if (!find_email)
      throw new UnauthorizedException('Email o contraseña incorrecta');

    const valid_password = await compare(body.password, find_email.password);

    if (!valid_password)
      throw new UnauthorizedException('Email o contraseña incorrecta');

    const user_payload = {
      sub: find_email.id,
      role: find_email.is_admin ? Role.Admin : Role.User,
    };
    // se puede hacer let de role y quedaria mejor

    const token = this.jwtService.sign(user_payload);

    return {
      message: 'Sesión iniciada correctamente',
      user_id: user_payload.sub,
      token,
    };
  }
}
