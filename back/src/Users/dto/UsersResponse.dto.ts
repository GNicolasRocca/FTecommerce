import {
  IsArray,
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUUID,
  Length,
} from 'class-validator';
import { Orders } from 'src/Orders/orders.entity';

// fijarse de cambiar los nombres de las clases por singular (tambien de otros dto)
export class UsersResponseDto {
  @IsNotEmpty()
  @IsUUID()
  id!: string;

  @IsString()
  @IsNotEmpty()
  @Length(3, 80)
  name!: string;

  @IsString()
  @IsEmail()
  email!: string;

  @IsNotEmpty()
  @IsNumber()
  phone!: number;

  @IsString()
  address!: string;

  @IsString()
  country!: string;

  @IsString()
  city!: string;

  @IsNotEmpty()
  @IsBoolean()
  is_admin!: boolean;

  @IsArray()
  orders!: Orders[];
}
