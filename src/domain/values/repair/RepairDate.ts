import { RepairDateError } from "../../errors/repair/RepairDateError";
import { Value } from "../Value";

export class RepairDate implements Value<Date> {
  public readonly value: Date;

  private constructor(value: Date) {
    this.value = value;
  }

  public static from(value: Date): RepairDate | Error {
    if (value <= new Date()) {
      return new RepairDateError();
    }
    return new RepairDate(value);
  }

  public is(item: Value<Date>): boolean {
    return item.value.getTime() === this.value.getTime();
  }

  public isValue(value: Date): boolean {
    return value.getTime() === this.value.getTime();
  }
}
