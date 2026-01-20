import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { ProductsRepository } from './products.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Products } from './products.entity';
import { CategoriesModule } from 'src/Categories/categories.module';
import { UsersModule } from 'src/Users/users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Products]),
    CategoriesModule,
    UsersModule,
  ],
  providers: [ProductsService, ProductsRepository],
  controllers: [ProductsController],
  exports: [ProductsRepository],
})
export class ProductsModule {}
