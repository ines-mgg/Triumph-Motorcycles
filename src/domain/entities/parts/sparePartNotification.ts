import { SparePart } from './sparePart';

export class SparePartNotification {
  private notifications: string[] = []; // Store notifications for low stock parts

  constructor(private spareParts: SparePart[]) {}

  // Check each spare part's stock level and generate notifications if needed
  checkStockLevels(): void {
    this.spareParts.forEach((part) => {
      if (part.isStockLow()) {
        this.addNotification(part);
      }
    });
  }

  // Generate a notification for a low stock part
  private addNotification(part: SparePart): void {
    const notificationMessage = `Low stock alert: The spare part "${part.name}" (ID: ${part.id}) is below the critical level. Current stock: ${part.quantityInStock}.`;
    if (!this.notifications.includes(notificationMessage)) {
      this.notifications.push(notificationMessage);
    }
  }

  // Retrieve all notifications
  getNotifications(): string[] {
    return this.notifications;
  }

  // Clear notifications after they are acknowledged
  clearNotifications(): void {
    this.notifications = [];
  }
}
