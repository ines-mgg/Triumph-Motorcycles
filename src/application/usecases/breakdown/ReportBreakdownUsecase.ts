import { MotorcycleEntity } from "@triumph-motorcycles/domain/entities/drives";
import { BreakdownEntity, WarrantyEntity } from "@triumph-motorcycles/domain/entities/maintenances";
import { BreakdownRepository } from "../../repositories/BreakdownRepository";

export class ReportBreakdownUsecase {
  constructor(private readonly breakdownRepository: BreakdownRepository) {}

  public async execute(
    id: string,
    motorcycle: MotorcycleEntity,
    descriptionValue: string,
    reportedDateValue: Date,
    warranty: WarrantyEntity | null,
  ): Promise<void | Error> {
    const breakdown = BreakdownEntity.create(
      id,
      motorcycle,
      descriptionValue,
      reportedDateValue,
      warranty,
    );

    if (breakdown instanceof Error) {
      return breakdown;
    }

    await this.breakdownRepository.save(breakdown);
  }
}
