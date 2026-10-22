import { OrderDetails } from 'src/OrderDetails/orderDetails.entity';
import { Users } from 'src/Users/users.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({
  name: 'orders',
})
export class Orders {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('date')
  date: Date;

  @ManyToOne(() => Users, (user) => user.orders)
  @JoinColumn({ name: 'user_id' })
  user: Users;

  @OneToOne(() => OrderDetails, (details) => details.order, {
    cascade: true,
  })
  @JoinColumn({ name: 'order_details_id' })
  orderDetails: OrderDetails;
}
