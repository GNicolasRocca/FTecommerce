import { IsString, IsNumber, IsInt } from 'class-validator';

export class ProductCreateDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsNumber()
  price: number;

  @IsInt()
  stock: number;

  @IsString()
  categoryName: string;
}
