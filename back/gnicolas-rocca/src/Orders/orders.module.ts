import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Orders } from './orders.entity';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { OrdersRepository } from './orders.repository';
import { ProductsRepository } from 'src/Products/products.repository';
import { Users } from 'src/Users/users.entity';
import { Products } from 'src/Products/products.entity';
import { OrderDetails } from 'src/OrderDetails/orderDetails.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Orders, Users, Products, OrderDetails])],
  providers: [OrdersService, OrdersRepository, ProductsRepository],
  controllers: [OrdersController],
  exports: [OrdersRepository],
})
export class OrdersModule {}
