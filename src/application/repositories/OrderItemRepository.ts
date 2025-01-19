import { OrderItemEntity } from "@triumph-motorcycles/domain/entities/parts";

export interface OrderItemRepository {
  save(orderItem: OrderItemEntity): Promise<void>;
  findById(orderItemId: string): Promise<OrderItemEntity | null>;
  findByOrderId(orderId: string): Promise<OrderItemEntity[]>;
}
