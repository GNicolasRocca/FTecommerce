import { Products } from 'src/Products/products.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'categories',
})
export class Categories {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { length: 50, nullable: false })
  name: string;

  @OneToMany(() => Products, (product) => product.category)
  products: Products[];
}
