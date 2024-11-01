import { SparePart } from "./sparePart";
import { Parts } from "@triumph-motorcycles/domain/errors";

const { InvalidSparePartError } = Parts;

export class SparePartNotification {
  private notifications: string[] = [];

  constructor(private readonly spareParts: SparePart[]) {
    this.validateSpareParts();
  }

  private validateSpareParts(): void {
    if (!Array.isArray(this.spareParts)) {
      throw new InvalidSparePartError("La liste des pièces de rechange doit être un tableau.");
    }
    
    this.spareParts.forEach((part, index) => {
      if (!(part instanceof SparePart)) {
        throw new InvalidSparePartError(`Élément à l'index ${index} n'est pas une instance de SparePart.`);
      }
    });
  }

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
