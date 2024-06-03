import { Type } from 'class-transformer';
import { IsNumber, IsPositive } from 'class-validator';
import { number } from 'joi';

export class OrderItemDTO {
  @IsNumber()
  @IsPositive()
  productId: number;

  @IsNumber()
  @IsPositive()
  quantity: number;

  @IsNumber()
  @IsNumber()
  // @Type(()=>Number)
  price: number;
}
