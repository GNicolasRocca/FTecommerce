import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Categories } from './categories.entity';

@Injectable()
export class CategoriesRepository {
  constructor(
    @InjectRepository(Categories)
    private readonly categoriesRepository: Repository<Categories>,
  ) {}

  async getCategories() {
    return await this.categoriesRepository.find();
  }

  async add_category(categories: Partial<Categories>[]) {
    return await this.categoriesRepository.save(categories);
  }

  findByName(name: string) {
    return this.categoriesRepository.findOne({
      where: { name },
    });
  }
}
