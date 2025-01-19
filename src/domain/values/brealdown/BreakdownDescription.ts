import { BreakdownDescriptionError } from "../../errors/breakdown/BreakdownDescriptionError";
import { Value } from "../Value";

export class BreakdownDescription implements Value<string> {
  private constructor(public readonly value: string) {}

  public static from(value: string): BreakdownDescription | BreakdownDescriptionError {
    if (value.length < 5) {
      return new BreakdownDescriptionError('Description must be at least 5 characters long.');
    }
    if (value.length > 300) {
      return new BreakdownDescriptionError('Description cannot exceed 300 characters.');
    }
    return new BreakdownDescription(value);
  }

  public is(item: Value<string>): boolean {
    return item.value === this.value;
  }

  public isValue(value: string): boolean {
    return this.value === value;
  }
}
