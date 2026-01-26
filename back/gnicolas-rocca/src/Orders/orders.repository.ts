import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Orders } from './orders.entity';
import { In, MoreThan, Repository } from 'typeorm';
import { Products } from 'src/Products/products.entity';
import { Users } from 'src/Users/users.entity';
import { OrderDetails } from 'src/OrderDetails/orderDetails.entity';
import { CreateOrderDto } from 'src/dtos/CreateOrder.dto';

@Injectable()
export class OrdersRepository {
  constructor(
    @InjectRepository(Orders)
    private readonly ordersRepository: Repository<Orders>,

    @InjectRepository(Products)
    private readonly productsRepository: Repository<Products>,

    @InjectRepository(Users)
    private readonly usersRepository: Repository<Users>,

    @InjectRepository(OrderDetails)
    private readonly orderDetailsRepository: Repository<OrderDetails>,
  ) {}

  async get_order(id: string) {
    const order = await this.ordersRepository.findOne({
      where: { id },
      relations: ['orderDetails', 'orderDetails.products'],
    });

    return order;
  }

  async add_order(body: CreateOrderDto) {
    const { user_id, products } = body;
    // Poner comentarios de como funciona
    const find_user = await this.usersRepository.findOne({
      where: { id: user_id },
    });

    if (!find_user)
      return {
        success: false,
        message: 'Usuario no encontrado',
      };

    const products_id = products.map((p) => p.id);

    const found_products = await this.productsRepository.find({
      where: {
        id: In(products_id),
        stock: MoreThan(0),
      },
    });

    if (found_products.length === 0)
      throw new BadRequestException(
        'No se encontraron productos con stock disponible',
      );

    let total = 0;
    for (const product of found_products) {
      total = total + Number(product.price);
      product.stock = Number(product.stock) - 1;
    }
    console.log(found_products);
    await this.productsRepository.save(found_products);

    const order_detail = this.orderDetailsRepository.create({
      price: total,
      products: found_products,
    });
    await this.orderDetailsRepository.save(order_detail);

    const order = this.ordersRepository.create({
      user: find_user,
      date: new Date(),
      orderDetails: order_detail,
    });
    await this.ordersRepository.save(order);

    return {
      success: true,
      message: 'Orden creada correctamente',
      id: order.id,
      total: order_detail.price,
      order_detail_id: order_detail.id,
    };
  }
}
