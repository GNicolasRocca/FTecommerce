import {
  IsEmail,
  IsEmpty,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsStrongPassword,
  Length,
} from 'class-validator';

export class CreateUsersDto {
  @IsString()
  @IsNotEmpty()
  @Length(3, 80)
  name: string;

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

  @IsNotEmpty()
  @IsNumber()
  phone: number;

  @IsString()
  @Length(5, 20)
  country: string;

  @IsString()
  @Length(5, 20)
  city: string;

  @IsEmpty()
  is_admin: boolean;
}
// Faltaria adress pero tengo que agregarlo en users entity, chequear que validaciones poner en la HW pipes
