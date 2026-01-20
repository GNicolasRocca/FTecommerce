import { IsUUID } from 'class-validator';

export class OrderProductDto {
  @IsUUID()
  id: string;
}
