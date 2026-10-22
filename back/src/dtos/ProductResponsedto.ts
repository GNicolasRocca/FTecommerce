import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, IsUUID } from 'class-validator';
import { CategoryResponseDto } from './CategoryResponse.dto';

export class ProductResponseDto {
  @IsUUID()
  @IsNotEmpty()
  @ApiProperty({ format: 'uuid' })
  id: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'Playstation 4' })
  name: string;

  @IsString()
  @ApiProperty({ example: 'Consola de videojuegos' })
  description: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ example: '100' })
  price: number;

  @IsNumber() // esto no se si va a ser booleano
  @IsNotEmpty()
  @ApiProperty({ example: '10' })
  stock: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'http://imagen-ps4.pmg' })
  imgUrl: string;

  @ApiProperty()
  category: CategoryResponseDto;
}
