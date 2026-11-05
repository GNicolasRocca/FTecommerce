import {
  Body,
  Controller,
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
import { Users } from 'src/interfaces/user.interface';
import { UsersUpdateDto } from 'src/Users/dto/UsersUpdate.dto';
import { Role } from 'src/auth/roles.enum';
import { Roles } from 'src/auth/roles.decorator';
import { UsersModGuard } from 'src/auth/usersMod.guard';
import { AdminUsersUpdateDto } from 'src/Users/dto/AdminUsersUpdate.dto';
import { UsersResponseDto } from 'src/Users/dto/UsersResponse.dto';

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
    @Query('page') page?: string,
    @Query('limit') limit?: string,
  ): Promise<UsersResponseDto[]> {
    return this.usersService.get_all_users(
      page ? Number(page) : undefined,
      limit ? Number(limit) : undefined,
    );
  }

  @ApiBearerAuth(Role.Admin)
  @Get('user-email')
  @UseGuards(AuthGuard, RolesGuard)
  @HttpCode(200)
  async get_user_by_name(
    @Query('email') email: string,
  ): Promise<UsersResponseDto | null> {
    return this.usersService.get_user_by_email_admin(email);
  }

  @ApiBearerAuth()
  @Get('my-profile')
  @UseGuards(AuthGuard, UsersModGuard)
  @HttpCode(200)
  async get_user_by_id(
    @Req() request: Request & { user: Users },
  ): Promise<UsersResponseDto | null> {
    return await this.usersService.get_user_by_id(request.user.id);
  }

  @ApiBearerAuth(Role.Admin)
  @Get(':id')
  @UseGuards(AuthGuard, RolesGuard)
  @HttpCode(200)
  async get_user_id_admin(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<UsersResponseDto | null> {
    return this.usersService.get_user_by_id(id);
  }

  @ApiBearerAuth()
  @Put('update')
  @UseGuards(AuthGuard, UsersModGuard)
  @HttpCode(200)
  async update_user_by_id(
    @Req() request: Request & { user: Users },
    @Body() user: UsersUpdateDto,
  ): Promise<{
    success: boolean;
    message: string;
  }> {
    // Deberia ir una verificacion por mail
    return await this.usersService.update_user_id(request.user.id, user);
  }

  @ApiBearerAuth(Role.Admin)
  @Put('update/:id')
  @UseGuards(AuthGuard, RolesGuard)
  @HttpCode(200)
  async update_user_admin(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() user: AdminUsersUpdateDto,
  ): Promise<{
    success: boolean;
    message: string;
  }> {
    return await this.usersService.update_user_id(id, user);
  }

  @ApiBearerAuth()
  @Put('delete')
  @UseGuards(AuthGuard, UsersModGuard)
  @HttpCode(200)
  async delete_user_by_id(@Req() request: Request & { user: Users }): Promise<{
    success: boolean;
    message: string;
  }> {
    return await this.usersService.delete_user_id(request.user.id);
  }

  @ApiBearerAuth(Role.Admin)
  @Put('delete/:id')
  @UseGuards(AuthGuard, RolesGuard)
  @HttpCode(200)
  async delete_user_admin(@Param('id', ParseUUIDPipe) id: string): Promise<{
    success: boolean;
    message: string;
  }> {
    return await this.usersService.delete_user_id(id);
  }
}
