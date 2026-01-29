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

  async add_product(product: Partial<Products>) {
    const prod = this.productsRepository.create(product);
    return this.productsRepository.save(prod);
  }

  async findByName(name: string) {
    return this.productsRepository.findOne({
      where: { name },
    });
  }

  get_products() {
    return this.productsRepository.find({
      relations: ['category'],
    });
  }

  async update_product(id: string, product: Partial<Products>) {
    const prod_found = await this.get_by_id(id);

    if (!prod_found) {
      throw new NotFoundException('Producto no encontrado');
    }

    this.productsRepository.merge(prod_found, product);

    return this.productsRepository.save(prod_found);
  }

  async delete_product(id: string) {
    const result = await this.productsRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException('Producto no encontrado');
    }

    return { succes: true, message: 'Producto eliminado' };
  }

  async get_by_id(id: string) {
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
