import { OrderItemEntity, SparePartEntity } from "@triumph-motorcycles/domain/entities/parts";
import { OrderItemRepository } from "../../repositories/OrderItemRepository";

export class CreateOrderItemUsecase {
  constructor(
    private readonly orderItemRepository: OrderItemRepository,
  ) {}

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
      deliveredQuantityValue
    );

    if(orderItem instanceof Error) return orderItem

    await this.orderItemRepository.save(orderItem);
  }
}
