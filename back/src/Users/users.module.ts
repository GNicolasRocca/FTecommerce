import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UsersRepository } from './users.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './users.entity';
import { CloudinaryConfig } from 'src/config/cloudinary';
import { CloudinaryRepository } from 'src/cloudinary/cloudinary.repository';
import { Products } from 'src/Products/products.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Users, Products])], // Puse products aca porque me lo pidio la consola
  providers: [
    UsersService,
    UsersRepository,
    CloudinaryConfig,
    CloudinaryRepository,
  ],
  controllers: [UsersController],
  exports: [UsersService, UsersRepository],
})
export class UsersModule {}
