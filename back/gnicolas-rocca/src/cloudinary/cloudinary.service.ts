import { Injectable } from '@nestjs/common';
import { CloudinaryRepository } from './cloudinary.repository';

@Injectable({})
export class CloudinaryService {
  constructor(private readonly cloudinaryRepository: CloudinaryRepository) {}

  async get_image_by_id(id: string, file: Express.Multer.File) {
    return this.cloudinaryRepository.get_image_id(id, file);
  }
}
