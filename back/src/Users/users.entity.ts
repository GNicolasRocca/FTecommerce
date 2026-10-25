import { Orders } from 'src/Orders/orders.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
// import { v4 as uuid } from 'uuid';   = uuid();

@Entity({
  name: 'users',
})
export class Users {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { length: 50, nullable: false })
  name: string;

  @Column('varchar', { length: 50, unique: true, nullable: false })
  email: string;

  @Column('varchar', { length: 255, nullable: false }) // Lo tuve que cambiar porque al encriptar queda mas larga la contraseña
  password: string;

  @Column('int')
  phone: number;

  @Column('text')
  address: string;

  @Column('varchar', { length: 50 })
  country: string;

  @Column('varchar', { length: 50 })
  city: string;

  @Column({ default: false })
  is_admin: boolean;

  /*
  @Column({ default: false })
  is_client: boolean;
  */

  @OneToMany(() => Orders, (order) => order.user)
  orders: Orders[];
}
