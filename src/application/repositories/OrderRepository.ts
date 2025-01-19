import { OrderEntity } from "@triumph-motorcycles/domain/entities/parts";

export interface OrderRepository {
  save(order: OrderEntity): Promise<void>;
  findById(orderId: string): Promise<OrderEntity | null>;
  findByDateRange(startDate: Date, endDate: Date): Promise<OrderEntity[]>;
}