import { Injectable, NotFoundException } from '@nestjs/common';
import { Products } from './products.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable({})
export class ProductsRepository {
  constructor(
    @InjectRepository(Products)
    private readonly productsRepository: Repository<Products>,
  ) {}

  // eslint-disable-next-line prettier/prettier
  async add_product(product: Partial<Products>): Promise<Products> {
    return this.productsRepository.save(product);
  }

  async findByName(name: string): Promise<Products | null> {
    return this.productsRepository.findOne({
      where: { name },
    });
  }

  async get_products() {
    return this.productsRepository.find({
      relations: ['category'],
    });
  }

  async update_product(
    id: string,
    product: Partial<Products>,
  ): Promise<Products> {
    const prod_found = await this.get_by_id(id);

    Object.assign(prod_found, product); // Copia las propiedades del objeto de la derecha y las asigna al objeto de la izquierda

    return this.productsRepository.save(product);
  }

  async delete_product(id: string) {
    const result = await this.productsRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException('Producto no encontrado');
    }
  }

  async get_by_id(id: string): Promise<Products> {
    const product = await this.productsRepository.findOne({
      where: { id },
      relations: ['category'],
    });

    if (!product) {
      throw new NotFoundException('Producto no encontrado');
    }

    return product;
  }
}
