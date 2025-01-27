import { OrderEntity } from '@triumph-motorcycles/domain/entities';
import { OrderRepository } from '@triumph-motorcycles/application/repositories';

export class GetOrdersByDateRangeUsecase {
  constructor(private readonly orderRepository: OrderRepository) {}

  public async execute(
    startDate: Date,
    endDate: Date,
  ): Promise<OrderEntity[] | Error> {
    return await this.orderRepository.findByDateRange(startDate, endDate);
  }
}
