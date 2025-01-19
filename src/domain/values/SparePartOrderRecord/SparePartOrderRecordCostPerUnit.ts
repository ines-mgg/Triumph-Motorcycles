import { Value } from "../Value";

export class SparePartOrderRecordCostPerUnit implements Value<number> {
    constructor(public readonly value: number) {
      if (value <= 0) {
        throw new Error('Le coût par unité doit être supérieur à zéro.');
      }
    }
  
    is(item: Value<number>): boolean {
      return item.value === this.value;
    }
  
    isValue(value: number): boolean {
      return this.value === value;
    }
  }
  