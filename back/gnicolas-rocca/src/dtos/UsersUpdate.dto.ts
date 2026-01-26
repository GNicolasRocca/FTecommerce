import {
  IsString,
  IsEmail,
  MinLength,
  IsOptional,
  IsNumber,
  IsStrongPassword,
} from 'class-validator';

export class UsersUpdateDto {
  @IsOptional()
  @IsString()
  @MinLength(3)
  name?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  @MinLength(8)
  @IsStrongPassword()
  password?: string;

  @IsOptional()
  @IsNumber()
  phone?: number;

  @IsOptional()
  @IsString()
  address?: string;

  @IsOptional()
  @IsString()
  @MinLength(5)
  country?: string;

  @IsOptional()
  @IsString()
  @MinLength(5)
  city?: string;
}
