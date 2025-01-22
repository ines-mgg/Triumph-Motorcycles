import { Value } from "../Value";

export class SparePartOrderRecordDeliveredQuantity implements Value<number> {
    constructor(public readonly value: number) {
      if (value < 0) {
        throw new Error('La quantité livrée ne peut pas être négative.');
      }
    }
  
    is(item: Value<number>): boolean {
      return item.value === this.value;
    }
  
    isValue(value: number): boolean {
      return this.value === value;
    }
  }
  