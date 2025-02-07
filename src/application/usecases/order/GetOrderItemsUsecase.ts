import { OrderRepositoryInterface } from "@triumph-motorcycles/application/repositories/OrderRepositoryInterface";
import { OrderItemEntity } from "@triumph-motorcycles/domain/entities/order/OrderItemEntity";


export class GetOrderItemsUsecase {
  constructor(private readonly orderRepository: OrderRepositoryInterface) {}

  async execute(orderId: string): Promise<OrderItemEntity[] | Error> {
    const order = await this.orderRepository.findById(orderId);
    if (order instanceof Error) return order;

    return order.getItems();
  }
}
