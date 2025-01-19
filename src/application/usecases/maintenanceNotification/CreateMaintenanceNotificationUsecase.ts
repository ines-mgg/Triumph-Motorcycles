import { MaintenanceNotificationEntity } from "@triumph-motorcycles/domain/entities/maintenances";
import { MaintenanceNotificationRepository } from "../../repositories/MaintenanceNotificationRepository";
import { MaintenanceNotificationType } from "../../../domain/types/motorcycle";

export class CreateMaintenanceNotificationUsecase {
  constructor(
    private readonly notificationRepository: MaintenanceNotificationRepository,
  ) {}

  public async execute(
    recipientId: string,
    message: string,
    date: Date,
    type: MaintenanceNotificationType,
    isRead: boolean = false,
  ): Promise<void | Error> {
    
      const notification = MaintenanceNotificationEntity.create(
        recipientId,
        message,
        date,
        type,
        isRead
      );

      await this.notificationRepository.save(notification);
   
  }
}
