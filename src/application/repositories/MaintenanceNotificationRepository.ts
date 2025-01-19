import { MaintenanceNotificationEntity } from "@triumph-motorcycles/domain/entities/maintenances";

export interface MaintenanceNotificationRepository {
  save(notification: MaintenanceNotificationEntity): Promise<void>;
  findByRecipientId(recipientId: string): Promise<MaintenanceNotificationEntity[]>;
  findByType(type: string): Promise<MaintenanceNotificationEntity[]>;
  findByDateRange(startDate: Date, endDate: Date): Promise<MaintenanceNotificationEntity[]>;
  markAsRead(notificationId: string): Promise<void>;
}
