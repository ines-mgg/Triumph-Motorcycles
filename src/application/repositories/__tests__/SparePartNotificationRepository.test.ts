import { SparePartNotificationRepository } from '../SparePartNotificationRepository';
import { SparePartNotificationNotFoundError } from '@triumph-motorcycles/domain/errors/sparePart/SparePartNotificationNotFoundError';
import { notificationEntity } from '../../../tests/testUtils';

describe('SparePartNotificationRepository', () => {
  let sparePartNotificationRepository: SparePartNotificationRepository;
  beforeEach(() => {
    sparePartNotificationRepository = {
      findAll: jest.fn(),
      save: jest.fn(),
    };
  });
  it('should save an notificationEntity', async () => {
    await sparePartNotificationRepository.save(notificationEntity);
    expect(sparePartNotificationRepository.save).toHaveBeenCalledWith(
      notificationEntity,
    );
  });
  it('should find all concessions', async () => {
    (sparePartNotificationRepository.findAll as jest.Mock).mockResolvedValue(
      notificationEntity,
    );
    const result = await sparePartNotificationRepository.findAll();
    expect(result).toBe(notificationEntity);
  });
  it('should return an error if no notificationEntity', async () => {
    (sparePartNotificationRepository.findAll as jest.Mock).mockResolvedValue(
      new SparePartNotificationNotFoundError(),
    );
    const result = await sparePartNotificationRepository.findAll();
    expect(sparePartNotificationRepository.findAll).toHaveBeenCalledWith();
    expect(result).toBeInstanceOf(SparePartNotificationNotFoundError);
  });
});
