import { v4 as uuidv4 } from 'uuid';
import { SparePartEntity } from './SparePartEntity';

export class SparePartNotificationEntity {
  private notifications: string[] = [];

  private constructor(
    public readonly id: string,
    private readonly spareParts: SparePartEntity[],
  ) {}

  public static create(
    spareParts: SparePartEntity[],
  ): SparePartNotificationEntity | Error {
    const id = uuidv4();
    return new SparePartNotificationEntity(id, spareParts);
  }

  checkStockLevels(): void {
    this.spareParts.forEach((part) => {
      if (part.isStockLow()) {
        this.addNotification(part);
      }
    });
  }

  private addNotification(part: SparePartEntity): void {
    const notificationMessage = `Low stock alert: The spare part "${part.name}" (ID: ${part.id}) is below the critical level. Current stock: ${part.quantityInStock.value}.`;
    if (!this.notifications.includes(notificationMessage)) {
      this.notifications.push(notificationMessage);
    }
  }

  getNotifications(): string[] {
    return this.notifications;
  }

  clearNotifications(): void {
    this.notifications = [];
  }
}
