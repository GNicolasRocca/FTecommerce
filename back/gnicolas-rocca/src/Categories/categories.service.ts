import { Injectable } from '@nestjs/common';
import { CategoriesRepository } from './categories.repository';
// import * as categoriesInterface from 'src/Interfaces/categories.interface';

@Injectable({})
export class CategoriesService {
  constructor(private readonly categoriesRepository: CategoriesRepository) {}

  private readonly seedCategories = [
    { name: 'smartphone' },
    { name: 'monitor' },
    { name: 'keyboard' },
    { name: 'mouse' },
  ];

  async seed() {
    for (const category of this.seedCategories) {
      const exists = await this.categoriesRepository.findByName(category.name);

      if (!exists) {
        await this.categoriesRepository.add_category([category]);
      }
    }

    return { message: 'Seeder de categorías ejecutado correctamente' };
  }

  getCategories() {
    return this.categoriesRepository.getCategories();
  }

  //async create_category(data: Omit<categoriesInterface.Category, 'id'>) {
  //return this.categoriesRepository.create_a_category(data);
  //}
}
