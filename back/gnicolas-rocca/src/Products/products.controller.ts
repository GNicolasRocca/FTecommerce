import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import * as productInterface from 'src/interfaces/product.interface';
import { AuthGuard } from 'src/auth/auth.guard';
import { UsersService } from 'src/Users/users.service';
import { RolesGuard } from 'src/auth/roles.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(
    private productsService: ProductsService,
    private usersService: UsersService,
  ) {}

  @Post('seeder')
  async seeder() {
    return this.productsService.seed();
  }

  @Get('all')
  @HttpCode(200)
  get_products(@Query('page') page?: string, @Query('limit') limit?: string) {
    const has_page = page !== undefined && page !== '';
    const has_limit = limit !== undefined && limit !== '';
    if (!has_page || !has_limit) {
      this.usersService.no_params(
        page ? Number(page) : undefined,
        limit ? Number(limit) : undefined,
      );
    }

    return this.productsService.get_all_products();
  }

  @ApiBearerAuth()
  @Post('create')
  @UseGuards(AuthGuard)
  @HttpCode(201)
  create_new_product(@Body() product: productInterface.Product) {
    return this.productsService.create_product(product);
  }

  @ApiBearerAuth()
  @Put(':id')
  @UseGuards(AuthGuard)
  @HttpCode(200)
  async update_product_by_id(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() product: Omit<productInterface.Product, 'id'>,
  ) {
    return this.productsService.update_product_id(id, product);
  }

  @ApiBearerAuth()
  @Delete(':id')
  @UseGuards(AuthGuard)
  @HttpCode(200)
  delete_product_by_id(
    @Req() request: Request & { user: any },
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    return this.productsService.delete_product_id(id);
  }

  @Get(':id')
  @UseGuards(RolesGuard) // poner tambien los query param
  @HttpCode(200)
  get_product_by_id(
    @Param('id', ParseUUIDPipe) id: string,
    @Query('page') page: string,
    @Query('limit') limit: string,
  ) {
    const has_page = page !== undefined && page !== '';
    const has_limit = limit !== undefined && limit !== '';
    if (!has_page || !has_limit) {
      this.usersService.no_params(
        page ? Number(page) : undefined,
        limit ? Number(limit) : undefined,
      );
    }

    return this.productsService.get_product_id(id);
  }
}
