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
import { ApiProperty } from '@nestjs/swagger';

export class CreateOrderDto {
  @IsString()
  @IsNotEmpty()
  @IsUUID()
  @ApiProperty({ example: 'uuid' })
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
