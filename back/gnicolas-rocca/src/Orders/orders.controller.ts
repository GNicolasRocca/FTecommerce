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
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Users } from 'src/interfaces/user.interface';

@ApiTags('Orders')
@Controller('orders')
export class OrdersController {
  constructor(private ordersService: OrdersService) {} // no va en ma mayuscula la primera letra de esto del constructor

  @ApiBearerAuth()
  @Get(':id')
  @UseGuards(AuthGuard)
  get_order(
    @Req() request: Request & { user: Users },
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    return this.ordersService.order(id);
  }

  @ApiBearerAuth()
  @Post()
  @UseGuards(AuthGuard)
  create_order(
    @Req() request: Request & { user: Users },
    @Body() body: CreateOrderDto,
  ) {
    return this.ordersService.order_creation(body);
  }
}
