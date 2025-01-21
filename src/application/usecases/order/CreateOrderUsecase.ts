import { OrderEntity } from "@triumph-motorcycles/domain/entities/parts";
import { OrderRepository } from "../../repositories/OrderRepository";

export class CreateOrderUsecase {
  constructor(
    private readonly orderRepository: OrderRepository,
  ) {}

  public async execute(
    orderDateValue: Date,
    estimatedDeliveryDateValue: Date,
  ): Promise<void | Error> {
    const order = OrderEntity.create(orderDateValue, estimatedDeliveryDateValue);

    if(order instanceof Error) return order

    await this.orderRepository.save(order);
  }
}
