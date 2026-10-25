import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from './users.entity';
import { Repository } from 'typeorm';
import { CreateUsersDto } from 'src/dtos/CreateUsers.dto';
import { hash } from 'bcryptjs';
import { UsersUpdateDto } from 'src/dtos/UsersUpdate.dto';

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

    return await this.usersRepository.save(new_user);
  }

  async get_users() {
    return await this.usersRepository.find({
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

  find_user_email(email: string) {
    return this.usersRepository.findOne({ where: { email } });
  }

  get_id(id: string) {
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
    // Partial permite actualizar solo los campos enviados
    const user_exists = await this.usersRepository.findOne({
      where: { id },
    });

    if (!user_exists)
      throw new BadRequestException(
        'El usuario que intenta actualizar no existe',
      );

    if (user.password) {
      user.password = await this.hash_password(user.password);
    }

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

  async get_name(name: string) {
    const user_name = await this.usersRepository.findOne({
      where: { name },
    });

    return {
      message: 'Funciona',
      user_name,
    };
  }
}
