import { OrderItemEntity } from "@triumph-motorcycles/domain/entities/parts";
import { OrderItemNotFoundError } from "src/domain/errors/orderItem/OrderItemNotFoundError";

export interface OrderItemRepository {
  save(orderItem: OrderItemEntity): Promise<void>;
  findById(orderItemId: string): Promise<OrderItemEntity | OrderItemNotFoundError>;
  findByOrderId(orderId: string): Promise<OrderItemEntity[] | OrderItemNotFoundError>;
}
