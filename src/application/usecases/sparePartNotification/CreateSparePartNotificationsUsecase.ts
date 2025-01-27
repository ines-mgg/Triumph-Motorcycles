import { SparePartNotificationRepository } from '@triumph-motorcycles/application/repositories';
import {
  SparePartEntity,
  SparePartNotificationEntity,
} from '@triumph-motorcycles/domain/entities';

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
