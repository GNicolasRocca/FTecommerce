import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CategoryResponseDto {
  @IsUUID()
  @IsNotEmpty()
  @ApiProperty({ format: 'uuid' })
  id: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'Electrónica' })
  name: string;
}
