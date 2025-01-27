import { OrderItemRepository } from '../OrderItemRepository';
import { OrderItemNotFoundError } from '@triumph-motorcycles/domain/errors';
import { orderItem } from '../../../tests/testUtils';

describe('OrderItemRepository', () => {
  let repository: OrderItemRepository;

  beforeEach(() => {
    repository = {
      save: jest.fn(),
      findById: jest.fn(),
      findByOrderId: jest.fn(),
    };
  });

  it('should save an order item', async () => {
    await repository.save(orderItem);
    expect(repository.save).toHaveBeenCalledWith(orderItem);
  });

  it('should return OrderItemNotFoundError if order item not found by id', async () => {
    const orderItemId = 'non-existent-id';
    (repository.findById as jest.Mock).mockResolvedValue(
      new OrderItemNotFoundError(),
    );

    const result = await repository.findById(orderItemId);
    expect(result).toBeInstanceOf(OrderItemNotFoundError);
    expect(repository.findById).toHaveBeenCalledWith(orderItemId);
  });

  it('should return OrderItemNotFoundError if order items not found by order id', async () => {
    const orderId = 'non-existent-order-id';
    (repository.findByOrderId as jest.Mock).mockResolvedValue(
      new OrderItemNotFoundError(),
    );

    const result = await repository.findByOrderId(orderId);
    expect(result).toBeInstanceOf(OrderItemNotFoundError);
    expect(repository.findByOrderId).toHaveBeenCalledWith(orderId);
  });
});
