import { Module } from '@nestjs/common';
import { CloudinaryController } from './cloudinary.controller';
import { CloudinaryService } from './cloudinary.service';
import { CloudinaryRepository } from './cloudinary.repository';
import { ProductsModule } from 'src/Products/products.module';
import { Products } from 'src/Products/products.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Products]), ProductsModule],
  providers: [CloudinaryService, CloudinaryRepository],
  controllers: [CloudinaryController],
  exports: [CloudinaryRepository],
})
export class CloudinaryModule {}
