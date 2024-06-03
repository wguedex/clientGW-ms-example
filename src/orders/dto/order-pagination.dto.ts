import { IsEnum, IsOptional } from "class-validator";
import { OrderStatus, orderStatusList } from "../enum/order.enum";
import { PaginationDto } from "src/common";

export class OrderPaginationDTO extends PaginationDto {
    @IsOptional()
    @IsEnum(orderStatusList,{
        message: `Validate status are ${orderStatusList}`
    })
    status: OrderStatus
}

 