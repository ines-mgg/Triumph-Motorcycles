import { OrderEntity } from '@triumph-motorcycles/domain/entities/parts/OrderEntity';
import { OrderRepository } from '@triumph-motorcycles/application/repositories/OrderRepository';

export class GetOrderByIdUsecase {
  constructor(private readonly orderRepository: OrderRepository) {}

  public async execute(orderId: string): Promise<OrderEntity | Error> {
    return await this.orderRepository.findById(orderId);
  }
}
