import { OrderRepository } from '../OrderRepository';
import { order } from '../../../tests/testUtils';
import { OrderNotFoundError } from '@triumph-motorcycles/domain/errors/order/OrderNotFoundError';

describe('OrderRepository', () => {
  let orderRepository: OrderRepository;

  beforeEach(() => {
    orderRepository = {
      save: jest.fn(),
      findById: jest.fn(),
      findByDateRange: jest.fn(),
    };
  });

  it('should save an order', async () => {
    await orderRepository.save(order);
    expect(orderRepository.save).toHaveBeenCalledWith(order);
  });

  it('should find an order by id', async () => {
    (orderRepository.findById as jest.Mock).mockResolvedValue(order);
    const result = await orderRepository.findById('1');
    expect(result).toEqual(order);
    expect(orderRepository.findById).toHaveBeenCalledWith('1');
  });

  it('should return OrderNotFoundError if order not found by id', async () => {
    (orderRepository.findById as jest.Mock).mockResolvedValue(
      new OrderNotFoundError(),
    );
    const result = await orderRepository.findById('2');
    expect(result).toBeInstanceOf(OrderNotFoundError);
    expect(orderRepository.findById).toHaveBeenCalledWith('2');
  });

  it('should return OrderNotFoundError if no orders found by date range', async () => {
    const startDate = new Date('2023-01-01');
    const endDate = new Date('2023-12-31');
    (orderRepository.findByDateRange as jest.Mock).mockResolvedValue(
      new OrderNotFoundError(),
    );
    const result = await orderRepository.findByDateRange(startDate, endDate);
    expect(result).toBeInstanceOf(OrderNotFoundError);
    expect(orderRepository.findByDateRange).toHaveBeenCalledWith(
      startDate,
      endDate,
    );
  });
});
