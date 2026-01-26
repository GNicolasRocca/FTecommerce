import { Injectable } from '@nestjs/common';
import { OrdersRepository } from './orders.repository';
import { CreateOrderDto } from 'src/dtos/CreateOrder.dto';

@Injectable({})
export class OrdersService {
  constructor(private ordersRepository: OrdersRepository) {}

  order(id: string) {
    return this.ordersRepository.get_order(id);
  }

  order_creation(body: CreateOrderDto) {
    return this.ordersRepository.add_order(body);
  }
}
