import { OrderEntity } from "@triumph-motorcycles/domain/entities/parts";
import { OrderNotFoundError } from "src/domain/errors/order/OrderNotFoundError";

export interface OrderRepository {
  save(order: OrderEntity): Promise<void>;
  findById(orderId: string): Promise<OrderEntity | OrderNotFoundError>;
  findByDateRange(startDate: Date, endDate: Date): Promise<OrderEntity[] | OrderNotFoundError>;
}