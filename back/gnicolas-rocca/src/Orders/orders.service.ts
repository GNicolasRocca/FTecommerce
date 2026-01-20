import { Injectable } from '@nestjs/common';
import { OrdersRepository } from './orders.repository';
import { CreateOrderDto } from 'src/dtos/CreateOrder.dto';

@Injectable({})
export class OrdersService {
  constructor(private ordersRepository: OrdersRepository) {}

  order(id: string) {
    return this.ordersRepository.get_order(id);
  }

  async order_creation(body: CreateOrderDto) {
    console.log('Estamos en el controller');
    return this.ordersRepository.add_order(body);
  }
}
