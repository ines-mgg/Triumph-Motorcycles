import { Maintenances } from '@triumph-motorcycles/domain/errors';

const { InvalidNotificationError } = Maintenances;

export class MaintenanceNotification {
  constructor(
    public recipientId: string,
    public message: string,
    public date: Date,
    public type: 'StockAlert' | 'ServiceReminder' | 'IncidentReport',
    public isRead: boolean = false,
  ) {
    this.validate();
  }

  private validate(): void {
    if (!this.recipientId) {
      throw new InvalidNotificationError('Recipient ID cannot be empty');
    }
    if (!this.message || this.message.length === 0) {
      throw new InvalidNotificationError('Message cannot be empty');
    }
    if (!(this.date instanceof Date) || isNaN(this.date.getTime())) {
      throw new InvalidNotificationError('Date must be a valid Date object');
    }
    const validTypes = ['StockAlert', 'ServiceReminder', 'IncidentReport'];
    if (!validTypes.includes(this.type)) {
      throw new InvalidNotificationError(
        'Type must be either StockAlert, ServiceReminder, or IncidentReport',
      );
    }
  }

  markAsRead(): void {
    this.isRead = true;
  }

  changeType(
    newType: 'StockAlert' | 'ServiceReminder' | 'IncidentReport',
  ): void {
    const validTypes = ['StockAlert', 'ServiceReminder', 'IncidentReport'];
    if (!validTypes.includes(newType)) {
      throw new InvalidNotificationError('Invalid notification type');
    }
    this.type = newType;
  }
}
