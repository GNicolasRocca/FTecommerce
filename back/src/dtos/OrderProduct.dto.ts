import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

export class OrderProductDto {
  @IsUUID()
  @ApiProperty({ example: 'uuid' })
  id: string;
}
