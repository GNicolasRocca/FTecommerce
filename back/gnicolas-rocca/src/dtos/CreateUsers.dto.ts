import { ApiProperty } from '@nestjs/swagger';
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
  @ApiProperty({
    description: 'El nombre debe ser entre 3 y 80 cáracteres máximo de largo',
    example: 'Gonzalo',
  })
  name: string;

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

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({
    description: 'El número de télefono debe ser uno válido',
    example: '1145789466',
  })
  phone: number;

  @IsString()
  @Length(5, 20)
  @ApiProperty({
    description: 'Debe ser de largo entre 5 y 20 cáracteres máximo',
  })
  country: string;

  @IsString()
  @Length(5, 20)
  city: string;

  @IsEmpty()
  @ApiProperty({
    description:
      'Esta propiedad no es asignada por el usuario y por default es false',
    default: 'false',
  })
  is_admin: boolean;
}
// Faltaria adress pero tengo que agregarlo en users entity, chequear que validaciones poner en la HW pipes
// Le podria agregar a las description de apiProperty las validaciones de los pipes
