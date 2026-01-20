import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { v2 as cloudinary, UploadApiResponse } from 'cloudinary';
import { Repository } from 'typeorm';
import { Readable } from 'stream';
import { Products } from 'src/Products/products.entity';

@Injectable()
export class CloudinaryRepository {
  constructor(
    @InjectRepository(Products)
    private readonly productsRepository: Repository<Products>,
  ) {}

  async get_image_id(id: string, file: Express.Multer.File): Promise<Products> {
    //Subir imagen a cloudinary
    const upload_result = await this.uploadToCloudinary(file);

    const find_product = await this.productsRepository.findOne({
      where: { id },
    });

    if (!find_product) {
      throw new NotFoundException('Producto no encontrado');
    }

    // Actualizar imagen (ya que yo le puse una imagen de que no existe imagen del producto)
    find_product.imgUrl = upload_result.secure_url;

    return this.productsRepository.save(find_product);
  }

  private uploadToCloudinary(
    file: Express.Multer.File,
  ): Promise<UploadApiResponse> {
    return new Promise((resolve, reject) => {
      if (!file?.buffer) {
        return reject(new Error('Archivo inválido'));
      }

      // La constante uploadStream la muestran en el video
      const uploadStream = cloudinary.uploader.upload_stream(
        { folder: 'products' },
        (error, result) => {
          if (error) {
            return reject(new Error(error.message));
          }

          if (!result) {
            return reject(new Error('No se recibió respuesta de Cloudinary'));
          }

          resolve(result);
        },
      );

      Readable.from(file.buffer).pipe(uploadStream);
      // Los errores que me tira arriba es porque esLint esta en modo strict, los puedo omitir ya que el profe los hizo asi y es un poco problema resolverlo
    });
  }
}
