import {
  Body,
  Controller,
  Delete,
  Get, 
  Inject,
  Param, 
  ParseIntPipe, 
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { number } from 'joi';
import { catchError, firstValueFrom } from 'rxjs';
import { PaginationDto } from 'src/common';
// import { PRODUCT_SERVICE } from 'src/config';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { NATS_SERVICE } from 'src/config/services';

@Controller('products')
export class ProductsController {
  constructor(
    @Inject(NATS_SERVICE) private readonly productsClient: ClientProxy,
  ) {}

  @Post()
  createProduct(@Body() createProductDto: CreateProductDto) {
    return this.productsClient.send({cmd:'create_product'}, createProductDto);
  }

  @Get()
  findAllProducts(@Query() paginationDto: PaginationDto) {
    return this.productsClient.send(
      { cmd: 'find_all_products' },
      paginationDto,
    );
  }


  @Get(':id')
  async findOne(@Param('id') id: string) {

  return this.productsClient.send({ cmd: 'find_one_product' }, { id }).pipe(
    catchError((err) => {
      throw new RpcException(err);
    }),
  );

    // try {
    //   const product = await firstValueFrom(
    //     this.productsClient.send({ cmd: 'find_one_product' }, { id }),
    //   );
    //   return product;
    // } catch (error) {
    //   throw new RpcException({
    //     status: HttpStatus.BAD_REQUEST, 
    //     message: `Product with ID #${id} not found`
    //   });
    // }
  
  }

  @Delete(':id')
  deleteProduct(@Param('id') id: string) {
    return this.productsClient.send({cmd:'delete_product'},{ id }).pipe(
      catchError((err) => {
        throw new RpcException(err);
      }),
    );
  }

  @Patch(':id')
  patchProduct(
  @Param('id', ParseIntPipe) id: number, 
  @Body() updateProductDto: UpdateProductDto) {
    return this.productsClient.send({cmd:'update_product'}, {
      id,
      ...updateProductDto
    }).pipe(
      catchError((err) => {
        throw new RpcException(err);
      }),
    );
  }


  
}
