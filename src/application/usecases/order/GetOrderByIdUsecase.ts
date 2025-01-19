import { OrderEntity } from "@triumph-motorcycles/domain/entities/parts";
import { OrderRepository } from "../../repositories/OrderRepository";

export class GetOrderByIdUsecase {
  constructor(
    private readonly orderRepository: OrderRepository,
  ) {}

  public async execute(orderId: string): Promise<OrderEntity | null> {
    return await this.orderRepository.findById(orderId);
  }
}
