import { ApiProperty } from '@nestjs/swagger';

export class UserOrderResponseDto {
  @ApiProperty({ example: 'uuid' })
  id!: string;

  @ApiProperty({ example: 'Gonzalo Rocca' })
  name!: string;

  @ApiProperty({ example: 'correo@gmail.com' })
  email!: string;
}
