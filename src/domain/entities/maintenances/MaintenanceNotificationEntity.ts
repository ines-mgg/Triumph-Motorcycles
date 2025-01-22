import { MaintenanceNotificationType } from '../../types/motorcycle';
import { MaintenanceNotificationDate } from '../../values/maintenanceNotification/MaintenanceNotificationDate';
import { MaintenanceNotificationMessage } from '../../values/maintenanceNotification/MaintenanceNotificationMessage';
import crypto from 'crypto';

export class MaintenanceNotificationEntity {
  private constructor(
    public readonly recipientId: string,
    public readonly message: MaintenanceNotificationMessage,
    public readonly date: MaintenanceNotificationDate,
    public type: MaintenanceNotificationType,
    public isRead: boolean = false,
  ) {}

  public static create(
    message: string,
    date: Date,
    type: MaintenanceNotificationType,
    isRead: boolean = false,
  ): Error | MaintenanceNotificationEntity {
    
    const recipientId = crypto.randomUUID();
   
    const messageValue = MaintenanceNotificationMessage.from(message);
    if (messageValue instanceof Error) return messageValue;
    
    const dateValue = MaintenanceNotificationDate.from(date);
    if (dateValue instanceof Error) return dateValue;

    return new MaintenanceNotificationEntity(
      recipientId,
      messageValue,
      dateValue,
      type,
      isRead
    );
  }

  public markAsRead(): void {
    this.isRead = true;
  }
}
