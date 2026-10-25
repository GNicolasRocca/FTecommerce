import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { UsersUpdateDto } from 'src/dtos/UsersUpdate.dto';

@Injectable({})
export class UsersService {
  constructor(private usersRepository: UsersRepository) {}

  async get_all_users() {
    return this.usersRepository.get_users();
  }

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

  /*
  // Prueba
  async premiumClient(user_id: string) {
    const user = await this.usersRepo.findOne({
      where: { id: user_id },
      relations: ['orders'],
    });

    if (!user) throw new BadRequestException('Usuario no encontrado');

    if (user.orders.length > 2) {
      user.is_premium = true;

      await this.usersRepo.save(user);
    }
    console.log(user.is_premium);
  }
  */

  get_user_name(name: string) {
    return this.usersRepository.get_name(name);
  }
}
