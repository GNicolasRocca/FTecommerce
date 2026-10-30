import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseUUIDPipe,
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

  @Roles(Role.Admin)
  @ApiBearerAuth()
  @Get('/')
  @UseGuards(AuthGuard, RolesGuard)
  @HttpCode(200)
  async get_users(
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

    return this.usersService.get_all_users();
  }

  @ApiBearerAuth()
  @Get('user-email')
  @UseGuards(AuthGuard, RolesGuard)
  @HttpCode(200)
  async get_user_by_name(
    @Req() request: Request & { user: Users },
    @Query('email') email: string,
  ) {
    return this.usersService.get_user_by_email_admin(email);
  }

  @ApiBearerAuth()
  @Get(':id')
  @UseGuards(AuthGuard, UsersModGuard)
  @HttpCode(200)
  async get_user_id(
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
  @UseGuards(AuthGuard, UsersModGuard)
  @HttpCode(200)
  async update_user_by_id(
    @Req() request: Request & { user: Users },
    @Param('id', ParseUUIDPipe) id: string,
    @Body() user: UsersUpdateDto,
  ) {
    return this.usersService.update_user_id(id, user);
  }

  @ApiBearerAuth()
  @Delete(':id')
  @UseGuards(AuthGuard, UsersModGuard)
  @HttpCode(200)
  async delete_user_by_id(
    @Req() request: Request & { user: Users },
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    return this.usersService.delete_user_id(id);
  }
}
