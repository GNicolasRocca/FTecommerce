import { ApiProperty } from '@nestjs/swagger';

export class UsersResponseDto {
  @ApiProperty({ example: 'uuid' })
  id: string;
  name: string;
  email: string;
  phone: number;
  address: string;
  country: string;
  city: string;
}
