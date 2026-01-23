import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, IsStrongPassword, Length } from 'class-validator';

export class LoginUsersDto {
  @IsString()
  @IsEmail()
  @ApiProperty({
    description: 'El email debe ser un email válido',
    example: 'gonzalo@mail.com',
  })
  email: string;

  @IsString()
  @IsStrongPassword({
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 1,
  })
  @Length(8, 15)
  @ApiProperty({
    description:
      'La contraseña debe tener al menos 1 una minuscula, una máyuscula, un número y un cáracter. Y al menos entre 8 y 15 cáracteres de largo',
    example: 'Gonzalo1234$',
  })
  password: string;
}
