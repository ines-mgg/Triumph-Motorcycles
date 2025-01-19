import { OrderDateError } from "../../errors/order/OrderDateError";
import { Value } from "../Value";

export class OrderDate implements Value<Date> {
  public readonly value: Date;

  private constructor(value: Date) {
    this.value = value;
  }

  public static from(value: Date): OrderDate | Error {
    if (value < new Date()) {
      return new OrderDateError();
    }
    return new OrderDate(value);
  }

  public is(item: Value<Date>): boolean {
    return item.value.getTime() === this.value.getTime();
  }

  public isValue(value: Date): boolean {
    return value.getTime() === this.value.getTime();
  }
}
