import { OrderItemEntity } from '@triumph-motorcycles/domain/entities/parts/OrderItemEntity';
import { OrderItemRepository } from '@triumph-motorcycles/application/repositories/OrderItemRepository';

export class GetOrderItemByIdUsecase {
  constructor(private readonly orderItemRepository: OrderItemRepository) {}

  public async execute(orderItemId: string): Promise<OrderItemEntity | Error> {
    return await this.orderItemRepository.findById(orderItemId);
  }
}
