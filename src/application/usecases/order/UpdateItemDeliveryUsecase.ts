import { OrderNotFoundError } from "../../../domain/errors/order/OrderNotFoundError";
import { OrderRepository } from "../../repositories/OrderRepository";

export class UpdateItemDeliveryUsecase {
  constructor(
    private readonly orderRepository: OrderRepository,
  ) {}

  public async execute(
    orderId: string,
    sparePartId: string,
    deliveredQty: number,
  ): Promise<void | Error> {
    const order = await this.orderRepository.findById(orderId);
    if (!order) {
      return new OrderNotFoundError();
    }

    order.updateItemDelivery(sparePartId, deliveredQty);
    await this.orderRepository.save(order);
  }
}
