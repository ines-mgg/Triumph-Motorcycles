import { OrderEntity } from '@triumph-motorcycles/domain/entities/parts/OrderEntity';
import { OrderNotFoundError } from '@triumph-motorcycles/domain/errors/order/OrderNotFoundError';

export interface OrderRepository {
  save(order: OrderEntity): Promise<void>;
  findById(orderId: string): Promise<OrderEntity | OrderNotFoundError>;
  findByDateRange(
    startDate: Date,
    endDate: Date,
  ): Promise<OrderEntity[] | OrderNotFoundError>;
}
