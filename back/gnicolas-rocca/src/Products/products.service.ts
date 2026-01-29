import { Injectable } from '@nestjs/common';
import { ProductsRepository } from './products.repository';
import * as productInterface from 'src/interfaces/product.interface';
import { CategoriesRepository } from 'src/Categories/categories.repository';
import { ProductCreateDto } from 'src/dtos/ProductCreate.dto';

@Injectable({})
export class ProductsService {
  constructor(
    private productsRepository: ProductsRepository,
    private readonly categoriesRepository: CategoriesRepository,
  ) {}

  private readonly seed_products = [
    {
      name: 'Samsung Galaxy S23',
      description: 'The best smartphone in the world',
      price: 150,
      stock: 4,
      imgUrl: 'imagen de samsung S23',
      categoryName: 'smartphone',
    },
    {
      name: 'Razer BlackWidow V3',
      description: 'The best keyboard in the world',
      price: 100,
      stock: 5,
      imgUrl: 'Imagen de teclado Razer',
      categoryName: 'keyboard',
    },
    {
      name: 'Samsung Odyssey G9',
      description: 'The best monitor in the world',
      price: 300,
      stock: 4,
      imgUrl: 'Imagen de monitor',
      categoryName: 'monitor',
    },
  ];

  async seed() {
    for (const product of this.seed_products) {
      const exists = await this.productsRepository.findByName(product.name);
      if (exists) continue;

      const category = await this.categoriesRepository.findByName(
        product.categoryName,
      );

      if (!category) {
        throw new Error(`Category ${product.categoryName} no encontrada`);
      }

      await this.productsRepository.add_product({
        name: product.name,
        description: product.description,
        price: product.price,
        stock: product.stock,
        category,
      });
    }

    return { message: 'Seeder de productos ejecutado correctamente' };
  }

  get_all_products() {
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
