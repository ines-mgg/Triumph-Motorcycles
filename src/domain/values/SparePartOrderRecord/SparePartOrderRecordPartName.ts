import { Value } from "../Value";

export class SparePartOrderRecordPartName implements Value<string> {
    private static readonly MAX_LENGTH = 50;
    private static readonly NAME_REGEX = /^[a-zA-Z0-9\s]+$/; 
  
    constructor(public readonly value: string) {
      if (!value || value.length > SparePartOrderRecordPartName.MAX_LENGTH) {
        throw new Error(
          `Le nom de la pièce ne peut pas dépasser ${SparePartOrderRecordPartName.MAX_LENGTH} caractères.`,
        );
      }
      if (!SparePartOrderRecordPartName.NAME_REGEX.test(value)) {
        throw new Error(
          'Le nom de la pièce ne peut contenir que des lettres, des chiffres et des espaces.',
        );
      }
    }
  
    is(item: Value<string>): boolean {
      return item.value === this.value;
    }
  
    isValue(value: string): boolean {
      return this.value === value;
    }
  }
  