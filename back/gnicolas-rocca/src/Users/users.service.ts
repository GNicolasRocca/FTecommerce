import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
// import * as userInterface from 'src/interfaces/user.interface';
import { CreateUsersDto } from 'src/dtos/CreateUsers.dto';
import { UsersUpdateDto } from 'src/dtos/UsersUpdate.dto';

@Injectable({})
export class UsersService {
  constructor(private usersRepository: UsersRepository) {}

  private readonly seeder_users: CreateUsersDto[] = [
    {
      // Admin
      email: 'gonzalo@mail.com',
      name: 'Gonzalo Lopez',
      password: 'Gonza1234$',
      phone: 1234579944,
      address: 'Av Sarmiento 3419',
      country: 'Argentina',
      city: 'Buenos Aires',
      is_admin: true,
    },
    {
      email: 'roberto@mail.com',
      name: 'Roberto Rodriguez',
      password: 'Rober1234$',
      phone: 112354445,
      address: 'San Martin 3243',
      country: 'Argentina',
      city: 'Buenos Aires',
      is_admin: false,
    },
    {
      email: 'ricardo@mail.com',
      name: 'Ricardo Guzman',
      password: 'Rick1234$',
      phone: 1123545467,
      address: 'Julio A Roca 2145',
      country: 'Argentina',
      city: 'Buenos Aires',
      is_admin: false,
    },
  ];

  async seeder() {
    await this.usersRepository.save_seeder(this.seeder_users);
    return { message: 'Seeder de usuarios ejecutado correctamente' };
  }

  get_all_users() {
    return this.usersRepository.get_users();
  }

  /*
  async new_user(user: CreateUsersDto): Promise<userInterface.Users> {
    return this.usersRepository.user_create(user);
  }
  */

  get_user_by_id(id: string) {
    return this.usersRepository.get_id(id);
  }

  update_user_id(id: string, user: UsersUpdateDto) {
    return this.usersRepository.update_user(id, user);
  }

  delete_user_id(id: string) {
    return this.usersRepository.delete_user(id);
  }

  no_params(page?: number, limit?: number) {
    page = page ?? 1;
    limit = limit ?? 5;
    page = Number(page);
    limit = Number(limit);
    console.log('Page es: ', page, ' y Limit es: ', limit);
  }
}
