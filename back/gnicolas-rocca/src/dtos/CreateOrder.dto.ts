import { Type } from 'class-transformer';
import {
  IsArray,
  IsNotEmpty,
  IsString,
  IsUUID,
  ArrayMinSize,
  ValidateNested,
} from 'class-validator';
import { OrderProductDto } from './OrderProduct.dto';

export class CreateOrderDto {
  @IsString()
  @IsNotEmpty()
  @IsUUID()
  user_id: string;

  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested()
  @Type(() => OrderProductDto)
  products: OrderProductDto[];
}

// @IsArray()
//  @ArrayMinSize(1)
//  products: { id: string }[];
