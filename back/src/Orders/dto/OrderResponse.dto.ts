import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsUUID } from 'class-validator';
import { OrderDetails } from 'src/OrderDetails/orderDetails.entity';
import { UserOrderResponseDto } from 'src/Users/dto/UserOrderResponse.dto';

export class OrderResponseDto {
  @IsUUID()
  @ApiProperty({ example: 'uuid' })
  id!: string;

  @IsDate()
  date!: Date;

  @ApiProperty({ type: () => UserOrderResponseDto })
  user!: UserOrderResponseDto;

  orderDetails!: OrderDetails;
}
