import { WarrantyStartDate } from '../../values/warranty/WarrantyStartDate';
import { WarrantyEndDate } from '../../values/warranty/WarrantyEndDate';
import { WarrantyCoverageDetails } from '../../values/warranty/WarrantyCoverageDetails';
import { Maintenances } from '@triumph-motorcycles/domain/errors';
import { MotorcycleEntity } from '../drives';

const { InvalidWarrantyError } = Maintenances;

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
    id: string,
    motorcycle: MotorcycleEntity,
    startDateValue: Date,
    endDateValue: Date,
    coverageDetailsValue: string,
    isActive: boolean,
  ): WarrantyEntity | Error {

    const startDate = WarrantyStartDate.from(startDateValue);
    if (startDate instanceof Error) {
      throw new InvalidWarrantyError(startDate.message);
    }

    const endDate = WarrantyEndDate.from(endDateValue, startDate.value);
    if (endDate instanceof Error) {
      throw new InvalidWarrantyError(endDate.message);
    }

    const coverageDetails = WarrantyCoverageDetails.from(coverageDetailsValue);
    if (coverageDetails instanceof Error) {
      throw new InvalidWarrantyError(coverageDetails.message);
    }

    return new WarrantyEntity(
      id,
      motorcycle,
      startDate,
      endDate,
      coverageDetails,
      isActive
    );
  }

  public isWarrantyValid(checkDate: Date): boolean {
    return (
      checkDate >= this.startDate.value && checkDate <= this.endDate.value && this.isActive
    );
  }

  public isRepairCovered(repairDate: Date): boolean {
    return this.isWarrantyValid(repairDate);
  }
}
