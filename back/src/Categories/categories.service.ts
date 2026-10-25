import { Injectable } from '@nestjs/common';
import { CategoriesRepository } from './categories.repository';
// import * as categoriesInterface from 'src/Interfaces/categories.interface';

@Injectable({})
export class CategoriesService {
  constructor(private readonly categoriesRepository: CategoriesRepository) {}

  async getCategories() {
    return await this.categoriesRepository.getCategories();
  }

  //async create_category(data: Omit<categoriesInterface.Category, 'id'>) {
  //return this.categoriesRepository.create_a_category(data);
  //}
}
