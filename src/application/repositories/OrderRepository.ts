import { OrderEntity } from '@triumph-motorcycles/domain/entities';
import { OrderNotFoundError } from '@triumph-motorcycles/domain/errors';

export interface OrderRepository {
  save(order: OrderEntity): Promise<void>;
  findById(orderId: string): Promise<OrderEntity | OrderNotFoundError>;
  findByDateRange(
    startDate: Date,
    endDate: Date,
  ): Promise<OrderEntity[] | OrderNotFoundError>;
}
