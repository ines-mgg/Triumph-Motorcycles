import { SparePartNotificationRepository } from '@triumph-motorcycles/application/repositories/SparePartNotificationRepository';
import { SparePartNotificationEntity } from '@triumph-motorcycles/domain/entities/parts/SparePartNotificationEntity';
import { SparePartEntity } from '@triumph-motorcycles/domain/entities/parts/SparePartEntity';

export class CreateSparePartNotificationsUsecase {
  constructor(
    private readonly sparePartNotificationRepository: SparePartNotificationRepository,
  ) {}

  public async execute(spareParts: SparePartEntity[]): Promise<void | Error> {
    const notification = SparePartNotificationEntity.create(spareParts);

    if (notification instanceof Error) return notification;

    notification.checkStockLevels();

    if (notification.getNotifications().length > 0) {
      await this.sparePartNotificationRepository.save(notification);
    }
  }
}
