import { OrderItemEntity } from "@triumph-motorcycles/domain/entities/parts";
import { OrderItemRepository } from "../../repositories/OrderItemRepository";

export class GetOrderItemByIdUsecase {
  constructor(
    private readonly orderItemRepository: OrderItemRepository,
  ) {}

  public async execute(orderItemId: string): Promise<OrderItemEntity | Error> {
    return await this.orderItemRepository.findById(orderItemId);
  }
}
