import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateOrderDto } from './dto/CreateOrder.dto';
import { Role } from 'src/auth/roles.enum';

@ApiTags('Orders')
@Controller('orders')
export class OrdersController {
  constructor(private ordersService: OrdersService) {}

  @ApiBearerAuth()
  @Get(':id')
  @UseGuards(AuthGuard)
  get_order(@Param('id', ParseUUIDPipe) id: string) {
    return this.ordersService.order(id);
  }

  @ApiBearerAuth()
  @Get('user-orders')
  get_user_orders(
    @Req() request: Request & { user: { sub: string; role: Role } },
  ) {
    return this.ordersService.get_user_orders(request.user.sub);
  }

  // Tendria que poner cuanta cantidad del producto quiero
  @ApiBearerAuth()
  @Post()
  @UseGuards(AuthGuard)
  create_order(@Body() body: CreateOrderDto) {
    return this.ordersService.order_creation(body);
  }
}
