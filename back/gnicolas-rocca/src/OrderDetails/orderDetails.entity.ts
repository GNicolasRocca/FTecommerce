import { Orders } from 'src/Orders/orders.entity';
import { Products } from 'src/Products/products.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';

@Entity({
  name: 'orderDetails',
})
export class OrderDetails {
  @PrimaryGeneratedColumn('uuid')
  id: string = uuid();

  @Column('decimal', { precision: 10, scale: 2, nullable: false })
  price: number;

  @OneToOne(() => Orders, (order) => order.orderDetails)
  order: Orders;

  @ManyToMany(() => Products, (product) => product.orderDetails)
  @JoinTable()
  products: Products[];
}
