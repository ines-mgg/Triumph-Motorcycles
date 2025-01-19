import { OrderItemNotFoundError } from "../../../domain/errors/orderItem/OrderItemNotFoundError";
import { OrderItemRepository } from "../../repositories/OrderItemRepository";

export class UpdateOrderItemDeliveryUsecase {
  constructor(
    private readonly orderItemRepository: OrderItemRepository,
  ) {}

  public async execute(
    orderItemId: string,
    deliveredQty: number,
  ): Promise<void | Error> {
    const orderItem = await this.orderItemRepository.findById(orderItemId);
    if (!orderItem) {
      return new OrderItemNotFoundError();
    }

    orderItem.updateDelivery(deliveredQty);
    await this.orderItemRepository.save(orderItem);
  }
}
