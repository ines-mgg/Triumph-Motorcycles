import { OrderItemEntity } from '@triumph-motorcycles/domain/entities/parts/OrderItemEntity';
import { OrderItemNotFoundError } from '@triumph-motorcycles/domain/errors/orderItem/OrderItemNotFoundError';

export interface OrderItemRepository {
  save(orderItem: OrderItemEntity): Promise<void>;
  findById(
    orderItemId: string,
  ): Promise<OrderItemEntity | OrderItemNotFoundError>;
  findByOrderId(
    orderId: string,
  ): Promise<OrderItemEntity[] | OrderItemNotFoundError>;
}
