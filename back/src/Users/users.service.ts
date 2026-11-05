import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { UsersUpdateDto } from 'src/Users/dto/UsersUpdate.dto';
import { AdminUsersUpdateDto } from 'src/Users/dto/AdminUsersUpdate.dto';
import { UsersResponseDto } from 'src/Users/dto/UsersResponse.dto';

@Injectable({})
export class UsersService {
  constructor(private usersRepository: UsersRepository) {}

  async get_all_users(
    page?: number,
    limit?: number,
  ): Promise<UsersResponseDto[]> {
    const params = this.no_params(page, limit);

    return await this.usersRepository.get_users(params.page, params.limit);
  }

  async get_user_by_email_admin(
    email: string,
  ): Promise<UsersResponseDto | null> {
    return this.usersRepository.find_user_email(email);
  }

  async get_user_by_id(id: string): Promise<UsersResponseDto | null> {
    return this.usersRepository.get_id(id);
  }

  async update_user_id(
    id: string,
    user: UsersUpdateDto | AdminUsersUpdateDto,
  ): Promise<{
    success: boolean;
    message: string;
  }> {
    await this.usersRepository.update_user(id, user);

    return {
      success: true,
      message: 'Usuario actualizado correctamente',
    };
  }

  async delete_user_id(id: string): Promise<{
    success: boolean;
    message: string;
  }> {
    await this.usersRepository.delete_user(id);

    return {
      success: true,
      message: 'Usuario eliminado correctamente',
    };
  }

  no_params(page?: number, limit?: number): { page: number; limit: number } {
    page = page ?? 1;
    limit = limit ?? 5;

    page = Number(page);
    limit = Number(limit);

    return { page, limit };
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
}
