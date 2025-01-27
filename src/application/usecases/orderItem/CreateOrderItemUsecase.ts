import {
  OrderItemEntity,
  SparePartEntity,
} from '@triumph-motorcycles/domain/entities';
import { OrderItemRepository } from '@triumph-motorcycles/application/repositories';

export class CreateOrderItemUsecase {
  constructor(private readonly orderItemRepository: OrderItemRepository) {}

  public async execute(
    sparePart: SparePartEntity,
    quantityOrderedValue: number,
    costPerUnitValue: number,
    deliveredQuantityValue: number = 0,
  ): Promise<void | Error> {
    const orderItem = OrderItemEntity.create(
      sparePart,
      quantityOrderedValue,
      costPerUnitValue,
      deliveredQuantityValue,
    );

    if (orderItem instanceof Error) return orderItem;

    await this.orderItemRepository.save(orderItem);
  }
}
