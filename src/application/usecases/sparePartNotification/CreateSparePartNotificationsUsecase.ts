import { SparePartEntity, SparePartNotificationEntity } from "@triumph-motorcycles/domain/entities/parts";
import { SparePartNotificationRepository } from "../../repositories/SparePartNotificationRepository";

export class CreateSparePartNotificationsUsecase {
  constructor(
    private readonly sparePartNotificationRepository: SparePartNotificationRepository,
  ) {}

  public async execute(spareParts: SparePartEntity[]): Promise<void | Error> {
    const notification = new SparePartNotificationEntity(spareParts);
    notification.checkStockLevels();
    
    if (notification.getNotifications().length > 0) {
      await this.sparePartNotificationRepository.save(notification);
    }
  }
}
