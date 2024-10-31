import { InvalidOrderError } from "../../errors/parts";
import { OrderItem } from "./orderItem";
import { SparePart } from "./sparePart";

export class Order {
  private readonly items: OrderItem[] = [];
  private readonly orderDate: Date;
  private readonly estimatedDeliveryDate: Date;
  private totalCost: number = 0;

  constructor(
    public orderId: string,
    orderDate: Date,
    estimatedDeliveryDate: Date,
  ) {
    if (!orderId) {
      throw new InvalidOrderError("L'identifiant de la commande ne peut pas être vide.");
    }
    if (!(orderDate instanceof Date) || isNaN(orderDate.getTime())) {
      throw new InvalidOrderError("La date de commande doit être une date valide.");
    }
    if (!(estimatedDeliveryDate instanceof Date) || isNaN(estimatedDeliveryDate.getTime())) {
      throw new InvalidOrderError("La date de livraison estimée doit être une date valide.");
    }
    if (estimatedDeliveryDate < orderDate) {
      throw new InvalidOrderError("La date de livraison estimée ne peut pas être antérieure à la date de commande.");
    }

    this.orderDate = orderDate;
    this.estimatedDeliveryDate = estimatedDeliveryDate;
  }

  addItem(sparePart: SparePart, quantity: number, costPerUnit: number): void {
    if (!sparePart) {
      throw new InvalidOrderError("La pièce de rechange ne peut pas être nulle.");
    }
    if (quantity <= 0 || typeof quantity !== 'number') {
      throw new InvalidOrderError("La quantité doit être un nombre positif supérieur à zéro.");
    }
    if (costPerUnit <= 0 || typeof costPerUnit !== 'number') {
      throw new InvalidOrderError("Le coût par unité doit être un nombre positif supérieur à zéro.");
    }

    const item = new OrderItem(sparePart, quantity, costPerUnit);
    this.items.push(item);
    this.totalCost += item.getTotalCost();
  }

  updateItemDelivery(sparePartId: string, deliveredQty: number): void {
    if (!sparePartId) {
      throw new InvalidOrderError("L'identifiant de la pièce de rechange ne peut pas être vide.");
    }
    if (deliveredQty < 0 || typeof deliveredQty !== 'number') {
      throw new InvalidOrderError("La quantité livrée doit être un nombre positif.");
    }

    const item = this.items.find((item) => item.sparePart.id === sparePartId);
    if (!item) {
      throw new InvalidOrderError("L'article de commande spécifié n'existe pas.");
    }
    if (deliveredQty > item.quantityOrdered - item.deliveredQuantity) {
      throw new InvalidOrderError("La quantité livrée ne peut pas dépasser la quantité commandée non livrée.");
    }

    item.updateDelivery(deliveredQty);
  }

  getTotalCost(): number {
    return this.totalCost;
  }

  isOrderFullyDelivered(): boolean {
    return this.items.every((item) => item.isFullyDelivered());
  }

  getUndeliveredItems(): OrderItem[] {
    return this.items.filter((item) => !item.isFullyDelivered());
  }

  getItems(): OrderItem[] {
    return this.items;
  }

  getOrderDate(): Date {
    return this.orderDate;
  }

  getEstimatedDeliveryDate(): Date {
    return this.estimatedDeliveryDate;
  }
}