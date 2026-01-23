import { Orders } from 'src/Orders/orders.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { v4 as uuid } from 'uuid';

@Entity({
  name: 'users',
})
export class Users {
  @PrimaryGeneratedColumn('uuid')
  id: string = uuid();

  @Column('varchar', { length: 50, nullable: false })
  name: string;

  @Column('varchar', { length: 50, unique: true, nullable: false })
  email: string;

  @Column('varchar', { length: 255, nullable: false }) //length 20 fijarse si en la 1ra clase lo piden asi
  password: string;

  @Column('numeric')
  phone: number;

  @Column('varchar', { length: 50 })
  country: string;

  @Column('varchar', { length: 50 })
  city: string;

  @Column({ default: false }) // true para probar los metodos admin
  is_admin: boolean;

  @OneToMany(() => Orders, (order) => order.user)
  orders: Orders[];
}

// Me faltaria agregar adress ya que lo pide en la clase Nest Pipes
