import { OrderItemDeliveredQuantityError } from "../../errors/orderItem/OrderItemDeliveredQuantityError";
import { Value } from "../Value";
import { OrderItemQuantityOrdered } from "./OrderItemQuantityOrdered";

export class OrderItemDeliveredQuantity implements Value<number> {
  public readonly value: number;

  private constructor(value: number) {
    this.value = value;
  }

  public static from(value: number, quantityOrdered: OrderItemQuantityOrdered): OrderItemDeliveredQuantity | Error {
    if (value < 0) {
      return new OrderItemDeliveredQuantityError();
    }

    if (value > quantityOrdered.value) {
      return new OrderItemDeliveredQuantityError();
    }

    return new OrderItemDeliveredQuantity(value);
  }

  public is(item: Value<number>): boolean {
    return item.value === this.value;
  }

  public isValue(value: number): boolean {
    return value === this.value;
  }
}
