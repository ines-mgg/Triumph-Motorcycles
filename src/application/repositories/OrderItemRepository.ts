import { OrderItemEntity } from "@triumph-motorcycles/domain/entities";
import { OrderItemNotFoundError } from "@triumph-motorcycles/domain/errors";


export interface OrderItemRepository {
  save(orderItem: OrderItemEntity): Promise<void>;
  findById(orderItemId: string): Promise<OrderItemEntity | OrderItemNotFoundError>;
  findByOrderId(orderId: string): Promise<OrderItemEntity[] | OrderItemNotFoundError>;
}
