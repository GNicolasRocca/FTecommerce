import { Products } from 'src/Products/products.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';

@Entity({
  name: 'categories',
})
export class Categories {
  @PrimaryGeneratedColumn('uuid')
  id: string = uuid();

  @Column('varchar', { length: 50, nullable: false })
  name: string;

  @OneToMany(() => Products, (product) => product.category)
  @JoinColumn()
  products: Products[];
}
