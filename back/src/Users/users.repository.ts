import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from './users.entity';
import { Repository } from 'typeorm';
import { CreateUsersDto } from 'src/Users/dto/CreateUsers.dto';
import { hash } from 'bcryptjs';
import { UsersUpdateDto } from 'src/Users/dto/UsersUpdate.dto';
import { UsersResponseDto } from 'src/Users/dto/UsersResponse.dto';

@Injectable({})
export class UsersRepository {
  constructor(
    @InjectRepository(Users)
    private readonly usersRepository: Repository<Users>,
  ) {}

  private async hash_password(password: string): Promise<string> {
    return hash(password, 10);
  } // Esto no es necesario creo, chequear

  async sing_up(user: CreateUsersDto): Promise<Users> {
    const new_user = this.usersRepository.create({
      name: user.name,
      email: user.email,
      password: user.password,
      phone: user.phone,
      address: user.address,
      country: user.country,
      city: user.city,
    });

    // Ver si cambiarlo y filtrar la info que pasa al service auth
    return await this.usersRepository.save(new_user);
  }

  async get_users(page: number, limit: number): Promise<UsersResponseDto[]> {
    return this.usersRepository.find({
      relations: ['orders'],
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        address: true,
        country: true,
        city: true,
        is_admin: true,
        orders: true,
      },
      skip: (page - 1) * limit,
      take: limit,
    });
  }

  async find_user_email(email: string): Promise<UsersResponseDto | null> {
    return this.usersRepository.findOne({
      where: { email },
      relations: ['orders'],
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        address: true,
        country: true,
        city: true,
        is_admin: true,
        orders: true,
      },
    });
  }

  async get_id(id: string): Promise<UsersResponseDto | null> {
    return this.usersRepository.findOne({
      where: { id },
      relations: ['orders'],
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        address: true,
        country: true,
        city: true,
        orders: true,
      },
    });
  }

  async update_user(id: string, user: UsersUpdateDto) {
    const user_exists = await this.usersRepository.findOne({
      where: { id },
    });

    if (!user_exists)
      throw new BadRequestException(
        'El usuario que intenta actualizar no existe o fue eliminado',
      );

    if (user_exists.is_admin === false)
      throw new BadRequestException(
        'El usuario que intenta actualizar no existe o fue eliminado',
      );

    if (user.password) {
      user.password = await this.hash_password(user.password);
    }

    const update = this.usersRepository.merge(user_exists, user);
    return await this.usersRepository.save(update);
  }

  async delete_user(id: string): Promise<{
    success: boolean;
    message: string;
  }> {
    const user_exists = await this.usersRepository.findOne({
      where: { id },
    });

    if (!user_exists)
      throw new BadRequestException(
        'El usuario que intenta eliminar no existe',
      );

    if (user_exists.is_active === false)
      throw new BadRequestException(
        'El usuario que intenta eliminar ya fue eliminado',
      );

    await this.usersRepository.update({ id }, { is_active: false });

    return {
      success: true,
      message: 'Usuario eliminado correctamente',
    };
  }
}
