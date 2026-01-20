import { Categories } from 'src/Categories/categories.entity';
import { OrderDetails } from 'src/OrderDetails/orderDetails.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';

@Entity({
  name: 'products',
})
export class Products {
  @PrimaryGeneratedColumn('uuid')
  id: string = uuid();

  @Column('varchar', { length: 50, nullable: false })
  name: string;

  @Column('text', { nullable: false })
  description: string;

  @Column('decimal', {
    precision: 10,
    scale: 2,
    nullable: false,
    transformer: {
      to: (value: number) => value,
      from: (value: string) => Number(value),
    },
  })
  price: number;

  @Column('numeric', {
    nullable: false,
    transformer: {
      to: (value: number) => value,
      from: (value: string) => Number(value),
    },
  })
  stock: number;

  @Column('varchar', { default: '../assets/product_no_available.png' })
  imgUrl: string;

  @ManyToOne(() => Categories, (category) => category.products, {
    nullable: false,
  })
  @JoinColumn({ name: 'category_id' })
  category: Categories;

  @ManyToMany(() => OrderDetails, (OrderDetails) => OrderDetails.products)
  orderDetails: OrderDetails[];
}
