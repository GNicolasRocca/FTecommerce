import { IsEmail, IsString, IsStrongPassword, Length } from 'class-validator';

export class LoginUsersDto {
  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  @IsStrongPassword({
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 1,
  })
  @Length(8, 15)
  password: string;
}
