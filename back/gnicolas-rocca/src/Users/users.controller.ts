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
import { RolesGuard } from 'src/auth/roles.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UsersResponseDto } from 'src/dtos/UsersResponse.dto';
import { Users } from 'src/interfaces/user.interface';
import { UsersUpdateDto } from 'src/dtos/UsersUpdate.dto';
import { Role } from 'src/auth/roles.enum';
import { Roles } from 'src/auth/roles.decorator';
import { UsersModGuard } from 'src/auth/usersMod.guard';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  // Con private readonly indicamos solo lectura, no lo podemos modificar

  @Post('seeder')
  seeder_users() {
    return this.usersService.seeder();
  }

  @Roles(Role.Admin)
  @ApiBearerAuth()
  @Get('/')
  @UseGuards(AuthGuard, RolesGuard)
  @HttpCode(200)
  get_users(
    @Req() request: Request & { user: Users },
    @Query('page') page?: string,
    @Query('limit') limit?: string,
  ): Promise<UsersResponseDto[]> {
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

  // Prueba
  @ApiBearerAuth()
  @Get('getN')
  @UseGuards(AuthGuard)
  @HttpCode(200)
  get_user_by_name(
    @Req() request: Request & { user: Users },
    @Query('name') name: string,
  ) {
    return this.usersService.get_user_name(name);
  }
  */

  @ApiBearerAuth()
  @Get(':id')
  @UseGuards(AuthGuard, UsersModGuard) // UsersModGuard sacarlo cuando quiera probar admmin
  @HttpCode(200)
  get_user_id(
    @Req() request: Request & { user: Users },
    @Param('id', ParseUUIDPipe) id: string,
    @Query('page') page?: string,
    @Query('limit') limit?: string,
  ): Promise<UsersResponseDto | null> {
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

  @ApiBearerAuth()
  @Put(':id')
  @UseGuards(AuthGuard, UsersModGuard) // UsersModGuard sacarlo cuando quiera probar admin
  @HttpCode(200)
  update_user_by_id(
    @Req() request: Request & { user: Users },
    @Param('id', ParseUUIDPipe) id: string,
    @Body() user: UsersUpdateDto,
  ) {
    return this.usersService.update_user_id(id, user);
  }

  @ApiBearerAuth()
  @Delete(':id')
  @UseGuards(AuthGuard)
  @HttpCode(200)
  delete_user_by_id(
    @Req() request: Request & { user: Users },
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    return this.usersService.delete_user_id(id);
  }
}
