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
import { CreateOrderDto } from '../dtos/CreateOrder.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('orders')
export class OrdersController {
  constructor(private ordersService: OrdersService) {} // no va en ma mayuscula la primera letra de esto del constructor

  @Get(':id')
  @UseGuards(AuthGuard)
  get_order(
    @Req() request: Request & { user: any },
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    return this.ordersService.order(id);
  }

  @Post()
  @UseGuards(AuthGuard)
  create_order(
    @Req() request: Request & { user: any },
    @Body() body: CreateOrderDto,
  ) {
    console.log('Estamos en el controller');
    return this.ordersService.order_creation(body);
  }
}
