import { OrderRepositoryInterface } from '@triumph-motorcycles/application/repositories/OrderRepositoryInterface';
import { OrderEntity } from '@triumph-motorcycles/domain/entities/order/OrderEntity';

export class GetAllOrdersUsecase {
  constructor(private readonly orderRepository: OrderRepositoryInterface) {}

  public async execute(): Promise<OrderEntity[] | Error> {
    return await this.orderRepository.findAll();
  }
}
