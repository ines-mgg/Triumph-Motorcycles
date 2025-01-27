import { Value } from "../Value";

export class SparePartOrderRecordQuantityOrdered implements Value<number> {
    constructor(public readonly value: number) {
      if (value <= 0) {
        throw new Error('La quantité commandée doit être supérieure à zéro.');
      }
    }
  
    is(item: Value<number>): boolean {
      return item.value === this.value;
    }
  
    isValue(value: number): boolean {
      return this.value === value;
    }
  }
  