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

  async getCategories(): Promise<Categories[]> {
    return this.categoriesRepository.find();
  }

  async add_category(categories: Partial<Categories>[]) {
    return this.categoriesRepository.save(categories);
  }

  async findByName(name: string): Promise<Categories | null> {
    return this.categoriesRepository.findOne({
      where: { name },
    });
  }
}
