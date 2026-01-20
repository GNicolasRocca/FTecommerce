import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
// import * as userInterface from 'src/interfaces/user.interface';
import { CreateUsersDto } from 'src/dtos/CreateUsers.dto';

@Injectable({})
export class UsersService {
  constructor(private usersRepository: UsersRepository) {}

  private readonly seeder_users: CreateUsersDto[] = [
    {
      email: 'gonzalo-mail@mail.com',
      name: 'Gonzalo Lopez',
      password: 'Gonza1234$',
      phone: 1234579944,
      country: 'Argentina',
      city: 'Buenos Aires',
      is_admin: false,
    },
    {
      email: 'roberto-mail@mail.com',
      name: 'Roberto Rodriguez',
      password: 'Rober1234$',
      phone: 112354445,
      country: 'Argentina',
      city: 'Buenos Aires',
      is_admin: false,
    },
    {
      email: 'ricardo-mail@mail.com',
      name: 'Ricardo Guzman',
      password: 'Rick1234$',
      phone: 1123545467,
      country: 'Argentina',
      city: 'Buenos Aires',
      is_admin: false,
    },
  ];

  async seeder() {
    await this.usersRepository.save_seeder(this.seeder_users);
    return { message: 'Seeder de usuarios ejecutado correctamente' };
  }

  async get_all_users() {
    return this.usersRepository.get_users();
  }

  /*
  async new_user(user: CreateUsersDto): Promise<userInterface.Users> {
    return this.usersRepository.user_create(user);
  }
  */

  async get_user_by_id(id: string) {
    return this.usersRepository.get_id(id);
  }

  async update_user_id(id: string, user: CreateUsersDto) {
    return this.usersRepository.update_user(id, user);
  }

  async delete_user_id(id: string) {
    return this.usersRepository.delete_user(id);
  }

  no_params(page?: number, limit?: number) {
    console.log('Estamos en el servicio', page, limit);
    return this.usersRepository.no_params_repo(page, limit);
  }
}

// http://localhost:3000/users
