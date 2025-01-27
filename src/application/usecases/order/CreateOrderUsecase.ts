import { OrderEntity } from '@triumph-motorcycles/domain/entities';
import { OrderRepository } from '@triumph-motorcycles/application/repositories';

export class CreateOrderUsecase {
  constructor(private readonly orderRepository: OrderRepository) {}

  public async execute(
    orderDateValue: Date,
    estimatedDeliveryDateValue: Date,
  ): Promise<void | Error> {
    const order = OrderEntity.create(
      orderDateValue,
      estimatedDeliveryDateValue,
    );

    if (order instanceof Error) return order;

    await this.orderRepository.save(order);
  }
}
