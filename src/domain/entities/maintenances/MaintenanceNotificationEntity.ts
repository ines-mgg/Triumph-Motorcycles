import { MaintenanceNotificationType } from '@triumph-motorcycles/domain/types';
import {
  MaintenanceNotificationDate,
  MaintenanceNotificationMessage,
} from '@triumph-motorcycles/domain/values';
import { v4 as uuidv4 } from 'uuid';

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
    const recipientId = uuidv4();

    const messageValue = MaintenanceNotificationMessage.from(message);
    if (messageValue instanceof Error) return messageValue;

    const dateValue = MaintenanceNotificationDate.from(date);
    if (dateValue instanceof Error) return dateValue;

    return new MaintenanceNotificationEntity(
      recipientId,
      messageValue,
      dateValue,
      type,
      isRead,
    );
  }

  public markAsRead(): void {
    this.isRead = true;
  }
}
