import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { CreateUsersDto } from 'src/dtos/CreateUsers.dto';
import { RolesGuard } from 'src/auth/roles.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  // Con private readonly indicamos solo lectura, no lo podemos modificar

  @Post('seeder')
  async seeder_users() {
    return this.usersService.seeder();
  }

  @Get('/') // Se debe devolver en el metodo si es admin
  @UseGuards(AuthGuard, RolesGuard)
  @HttpCode(200)
  async get_users(
    @Req() request: Request & { user: any },
    @Query('page') page?: string,
    @Query('limit') limit?: string,
  ) {
    const has_page = page !== undefined && page !== '';
    const has_limit = limit !== undefined && limit !== '';
    if (!has_page || !has_limit) {
      this.usersService.no_params(
        page ? Number(page) : undefined,
        limit ? Number(limit) : undefined,
      );
    }

    console.log(
      'Log para saber si le paso el query param me lo asiga bien',
      page,
      limit,
    );
    return this.usersService.get_all_users();
  }

  /*
  @Post('create')
  @HttpCode(201)
  async create_user(@Body() user: CreateUsersDto): Promise<userInterface.Users> {
    console.log(user);
    return this.usersService.new_user(user);
  }
  */

  @Get(':id') // Tendria que poner algo para que no me traiga la contraseña del usuario
  @UseGuards(AuthGuard)
  @HttpCode(200)
  async get_user_id(
    @Req() request: Request & { user: any }, // Tendria que estar tipado el user: any
    @Param('id', ParseUUIDPipe) id: string,
    @Query('page') page?: string,
    @Query('limit') limit?: string,
  ) {
    const has_page = page !== undefined && page !== '';
    const has_limit = limit !== undefined && limit !== '';
    if (!has_page || !has_limit) {
      this.usersService.no_params(
        page ? Number(page) : undefined,
        limit ? Number(limit) : undefined,
      );
    }

    return this.usersService.get_user_by_id(id);
  }

  @Put(':id')
  @UseGuards(AuthGuard)
  @HttpCode(200)
  async update_user_by_id(
    @Req() request: Request & { user: any },
    @Param('id', ParseUUIDPipe) id: string,
    @Body() user: CreateUsersDto,
  ) {
    return this.usersService.update_user_id(id, user);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  @HttpCode(200)
  async delete_user_by_id(
    @Req() request: Request & { user: any },
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    return this.usersService.delete_user_id(id);
  }
}
