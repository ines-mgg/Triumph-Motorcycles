import { OrderEntity } from "@triumph-motorcycles/domain/entities/parts";
import { OrderRepository } from "../../repositories/OrderRepository";

export class GetOrdersByDateRangeUsecase {
  constructor(
    private readonly orderRepository: OrderRepository,
  ) {}

  public async execute(startDate: Date, endDate: Date): Promise<OrderEntity[] | Error> {
    return await this.orderRepository.findByDateRange(startDate, endDate);
  }
}
