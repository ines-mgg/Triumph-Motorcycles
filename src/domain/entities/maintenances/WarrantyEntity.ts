import { v4 as uuidv4 } from 'uuid';
import { MotorcycleEntity } from '../drives/MotorcycleEntity';
import {
  WarrantyCoverageDetails,
  WarrantyEndDate,
  WarrantyStartDate,
} from '@triumph-motorcycles/domain/values';

export class WarrantyEntity {
  private constructor(
    public readonly id: string,
    public readonly motorcycle: MotorcycleEntity,
    public readonly startDate: WarrantyStartDate,
    public readonly endDate: WarrantyEndDate,
    public readonly coverageDetails: WarrantyCoverageDetails,
    public readonly isActive: boolean,
  ) {}

  public static create(
    motorcycle: MotorcycleEntity,
    startDateValue: Date,
    endDateValue: Date,
    coverageDetailsValue: string,
    isActive: boolean,
  ): WarrantyEntity | Error {
    const id = uuidv4();

    const startDate = WarrantyStartDate.from(startDateValue);
    if (startDate instanceof Error) return startDate;

    const endDate = WarrantyEndDate.from(endDateValue, startDate.value);
    if (endDate instanceof Error) return endDate;

    const coverageDetails = WarrantyCoverageDetails.from(coverageDetailsValue);
    if (coverageDetails instanceof Error) return coverageDetails;

    return new WarrantyEntity(
      id,
      motorcycle,
      startDate,
      endDate,
      coverageDetails,
      isActive,
    );
  }

  private normalizeDate(date: Date): Date {
    return new Date(date.setHours(0, 0, 0, 0));
  }

  public isWarrantyValid(checkDate: Date): boolean {
    const normalizedCheckDate = this.normalizeDate(checkDate);
    const normalizedStartDate = this.normalizeDate(this.startDate.value);
    const normalizedEndDate = this.normalizeDate(this.endDate.value);

    return (
      normalizedCheckDate >= normalizedStartDate &&
      normalizedCheckDate <= normalizedEndDate &&
      this.isActive
    );
  }

  public isRepairCovered(repairDate: Date): boolean {
    return this.isWarrantyValid(repairDate);
  }
}
