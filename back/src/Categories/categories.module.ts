import { Module } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';
import { CategoriesRepository } from './categories.repository'; // Las clases van asi: CategoriesRepository
import { TypeOrmModule } from '@nestjs/typeorm';
import { Categories } from './categories.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Categories])],
  providers: [CategoriesService, CategoriesRepository],
  controllers: [CategoriesController],
  exports: [CategoriesRepository],
})
export class CategoriesModule {}
