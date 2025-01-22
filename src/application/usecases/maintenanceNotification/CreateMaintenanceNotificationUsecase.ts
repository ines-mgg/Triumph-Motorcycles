import { MaintenanceNotificationEntity } from "@triumph-motorcycles/domain/entities/maintenances";
import { MaintenanceNotificationRepository } from "../../repositories/MaintenanceNotificationRepository";
import { MaintenanceNotificationType } from "../../../domain/types/motorcycle";

export class CreateMaintenanceNotificationUsecase {
  constructor(
    private readonly notificationRepository: MaintenanceNotificationRepository,
  ) {}

  public async execute(
    message: string,
    date: Date,
    type: MaintenanceNotificationType,
    isRead: boolean = false,
  ): Promise<void | Error> {
    
      const notification = MaintenanceNotificationEntity.create(
        message,
        date,
        type,
        isRead
      );
      
      if(notification instanceof Error) return notification

      await this.notificationRepository.save(notification);
   
  }
}
