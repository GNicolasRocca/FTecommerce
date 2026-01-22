import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from './users.entity';
import { Repository } from 'typeorm';
import { UsersResponseDto } from 'src/dtos/ResponseUsers.dto';
import { CreateUsersDto } from 'src/dtos/CreateUsers.dto';
// import * as bcrypt from 'bcrypt';
import { hash, compare } from 'bcryptjs'; // compare se usa para login
import { JwtService } from '@nestjs/jwt';
import { Role } from 'src/auth/roles.enum';

@Injectable({})
export class UsersRepository {
  constructor(
    @InjectRepository(Users)
    private readonly usersRepository: Repository<Users>,
    private readonly jwtService: JwtService,
  ) {}

  async save_seeder(users: CreateUsersDto[]): Promise<Users[]> {
    const entities = this.usersRepository.create(users);
    return this.usersRepository.save(entities);
  }

  async get_users(): Promise<UsersResponseDto[]> {
    return Promise.resolve(
      this.usersRepository.find({
        relations: ['orders'],
      }),
    );
  }

  /*
  async user_create(user: CreateUsersDto) {
    // Con omit se omite el id de la interface User (aunque ahora cree un DTO que lo omite directamente al id)

    return Promise.resolve(this.usersRepository.save(user));
  }
  */

  async sing_up(user: CreateUsersDto) {
    const find_email = await this.find_user_email(user.email);

    if (find_email)
      throw new BadRequestException(
        'El email ingresado ya esta enlazado a una cuenta',
      );

    const hashed_password = await hash(user.password, 10);
    if (!hashed_password)
      throw new BadRequestException('La contraseña no pudo ser hasheada');

    // Guardar el usuario en la BDD
    const user_create = await this.usersRepository.save({
      ...user,
      password: hashed_password,
    });

    // Mostrar usuario sin la contraseña
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...result } = user_create;

    return result;
  }

  async sign_in(email: string, password: string) {
    const find_user_email = await this.usersRepository.findOne({
      where: { email },
    });

    if (!find_user_email) {
      throw new UnauthorizedException('Email o contraseña incorrecta');
    }

    const valid_password = await compare(password, find_user_email.password);

    if (!valid_password)
      throw new UnauthorizedException('Email o contraseña incorrecta');

    const user_payload = {
      sub: find_user_email.id,
      id: find_user_email.id,
      email: find_user_email.email,
      role: find_user_email.is_admin ? Role.Admin : Role.User,
    };

    const token = this.jwtService.sign(user_payload);

    return {
      message: 'Usuario logueado correctamente',
      user_id: find_user_email.id,
      token,
    };
  }

  async find_user_email(email: string) {
    return await this.usersRepository.findOne({ where: { email } });
  }

  async get_id(id: string): Promise<UsersResponseDto | null> {
    return await this.usersRepository.findOne({
      where: { id },
      relations: ['orders'],
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        country: true,
        city: true,
        orders: true,
      },
    });
  }

  async update_user(id: string, user: CreateUsersDto) {
    // Partial permite actualizar solo los campos enviados
    const user_exists = await this.usersRepository.findOne({
      where: { id },
    });

    if (!user_exists) return null;

    const update = this.usersRepository.merge(user_exists, user);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const update_save = await this.usersRepository.save(update);

    return {
      success: true,
      message: 'Usuario actualizado correctamente',
    };
  }

  async delete_user(id: string) {
    const user_exists = await this.usersRepository.findOne({
      where: { id },
    });

    if (!user_exists) return false;

    await this.usersRepository.delete(id);

    return {
      success: true,
      message: 'Usuario eliminado correctamente',
    };
  }
}
