
import { IsEnum, IsOptional } from "class-validator";
import { OrderStatus, orderStatusList } from "../enum/order.enum";




export class StatusDTO {

    @IsOptional()
    @IsEnum(orderStatusList, {
        message: `Validate status are ${orderStatusList}`
    })
    status: OrderStatus;

}