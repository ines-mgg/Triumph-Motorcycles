import { InvalidNotificationError } from '../../errors/maintenances';
import { MaintenanceNotificationType } from '../../types/motorcycle';
import { MaintenanceNotificationDate } from '../../values/maintenanceNotification/MaintenanceNotificationDate';
import { MaintenanceNotificationMessage } from '../../values/maintenanceNotification/MaintenanceNotificationMessage';

export class MaintenanceNotificationEntity {
  private constructor(
    public readonly recipientId: string,
    public readonly message: MaintenanceNotificationMessage,
    public readonly date: MaintenanceNotificationDate,
    public type: MaintenanceNotificationType,
    public isRead: boolean = false,
  ) {}

  public static create(
    recipientId: string,
    message: string,
    date: Date,
    type: MaintenanceNotificationType,
    isRead: boolean = false,
  ): MaintenanceNotificationEntity {
    if (!recipientId) {
      throw new InvalidNotificationError('Recipient ID cannot be empty');
    }

    const messageValue = MaintenanceNotificationMessage.from(message);
    if (messageValue instanceof Error) {
      throw messageValue;
    }

    const dateValue = MaintenanceNotificationDate.from(date);
    if (dateValue instanceof Error) {
      throw dateValue;
    }

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
