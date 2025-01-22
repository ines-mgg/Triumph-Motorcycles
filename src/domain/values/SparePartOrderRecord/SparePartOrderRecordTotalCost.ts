import { Value } from "../Value";

export class SparePartOrderRecordTotalCost implements Value<number> {
    constructor(public readonly value: number) {
      if (value < 0) {
        throw new Error('Le coût total ne peut pas être négatif.');
      }
    }
  
    is(item: Value<number>): boolean {
      return item.value === this.value;
    }
  
    isValue(value: number): boolean {
      return this.value === value;
    }
  }
  