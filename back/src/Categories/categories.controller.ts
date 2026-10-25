import { Controller, Get } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { ApiTags } from '@nestjs/swagger';
// import * as categoriesInterface from 'src/Interfaces/categories.interface';

@ApiTags('Categories')
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get('all')
  async get_all_categories() {
    return this.categoriesService.getCategories();
  }

  // @Post('create')
  // async create_new_category(@Body() data: categoriesInterface.Category) {
  // return this.categoriesService.create_category(data);
  // }
}
