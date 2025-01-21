import { MaintenanceNotificationEntity } from "@triumph-motorcycles/domain/entities/maintenances";
import { MaintenanceNotificationNotFoundError } from "src/domain/errors/maintenance/MaintenanceNotificationNotFoundError";

export interface MaintenanceNotificationRepository {
  save(notification: MaintenanceNotificationEntity): Promise<void>;
  findByRecipientId(recipientId: string): Promise<MaintenanceNotificationEntity[] | MaintenanceNotificationNotFoundError>;
  findByType(type: string): Promise<MaintenanceNotificationEntity[] | MaintenanceNotificationNotFoundError>;
  findByDateRange(startDate: Date, endDate: Date): Promise<MaintenanceNotificationEntity[] | MaintenanceNotificationNotFoundError>;
  markAsRead(notificationId: string): Promise<void>;
}
