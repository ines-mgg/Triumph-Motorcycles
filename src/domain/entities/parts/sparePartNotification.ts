import { SparePart } from './sparePart';

export class SparePartNotification {
  private notifications: string[] = [];

  constructor(private readonly spareParts: SparePart[]) {}

  checkStockLevels(): void {
    this.spareParts.forEach((part) => {
      if (part.isStockLow()) {
        this.addNotification(part);
      }
    });
  }

  private addNotification(part: SparePart): void {
    const notificationMessage = `Low stock alert: The spare part "${part.name}" (ID: ${part.id}) is below the critical level. Current stock: ${part.quantityInStock}.`;
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
