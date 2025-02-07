import { OrderEntity } from '@triumph-motorcycles/domain/entities/parts/OrderEntity';
import { OrderNotFoundError } from '@triumph-motorcycles/domain/errors/order/OrderNotFoundError';

export interface OrderRepository {
  save(order: OrderEntity): Promise<void>;
  findById(orderId: string): Promise<OrderEntity | OrderNotFoundError>;
  findByDateRange(
    startDate: Date,
    endDate: Date,
  ): Promise<OrderEntity[] | OrderNotFoundError>;
  update(order: OrderEntity): Promise<void>;
  findAll(): Promise<OrderEntity[] | Error>;
  addItem(orderId: string, itemId: string): Promise<void | OrderNotFoundError>;
  delivery(orderId: string): Promise<void | OrderNotFoundError>;
}
