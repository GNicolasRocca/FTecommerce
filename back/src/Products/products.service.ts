import { Injectable } from '@nestjs/common';
import { ProductsRepository } from './products.repository';
import * as productInterface from 'src/interfaces/product.interface';
import { CategoriesRepository } from 'src/Categories/categories.repository';
import { ProductCreateDto } from 'src/dtos/ProductCreate.dto';
import { Products } from './products.entity';

@Injectable({})
export class ProductsService {
  constructor(
    private productsRepository: ProductsRepository,
    private readonly categoriesRepository: CategoriesRepository,
  ) {}

  async get_product_name(name: string): Promise<Products> {
    const prod_get = await this.productsRepository.get_name(name);

    return prod_get;
  }

  async get_all_products() {
    return this.productsRepository.get_products();
  }

  async create_product(product: ProductCreateDto) {
    const category = await this.categoriesRepository.findByName(
      product.categoryName,
    );

    if (!category) {
      throw new Error('Categoría no encontrada');
    }

    return this.productsRepository.add_product({
      ...product,
      category,
    });
  }

  get_product_id(id: string) {
    return this.productsRepository.get_by_id(id);
  }

  update_product_id(
    id: string,
    product: Partial<Omit<productInterface.Product, 'id'>>,
  ) {
    return this.productsRepository.update_product(id, product);
  }

  delete_product_id(id: string) {
    return this.productsRepository.delete_product(id);
  }
}
