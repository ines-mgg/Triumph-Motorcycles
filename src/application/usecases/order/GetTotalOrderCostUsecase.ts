import { OrderRepositoryInterface } from "@triumph-motorcycles/application/repositories/OrderRepositoryInterface";

export class GetTotalOrderCostUsecase {
  constructor(private readonly orderRepository: OrderRepositoryInterface) {}

  async execute(orderId: string): Promise<number | Error> {
    const order = await this.orderRepository.findById(orderId);
    if (order instanceof Error) return order;

    return order.getTotalCost();
  }
}
