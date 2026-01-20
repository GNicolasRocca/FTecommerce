import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUsersDto } from 'src/dtos/LoginUsers.dto';
import { CreateUsersDto } from 'src/dtos/CreateUsers.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async singup_to_app(@Body() user: CreateUsersDto) {
    return this.authService.signup_app(user);
  }

  @Post('signin')
  async signin_to_app(@Body() body: LoginUsersDto) {
    const log = await this.authService.signin_app(body);

    if (!body.email || !body.password) {
      throw new Error('Falta colocar alguno de los datos solicitados');
    }

    return log;
  }
}
