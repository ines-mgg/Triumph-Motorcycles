import { BreakdownRepository } from '@triumph-motorcycles/application/repositories/BreakdownRepository';
import { MotorcycleRepository } from '@triumph-motorcycles/application/repositories/MotorcycleRepository';
import { WarrantyRepository } from '@triumph-motorcycles/application/repositories/WarrantyRepository';
import { BreakdownEntity } from '@triumph-motorcycles/domain/entities/maintenances/BreakdownEntity';
import { WarrantyEntity } from '@triumph-motorcycles/domain/entities/maintenances/WarrantyEntity';
import { UnexpectedError } from '@triumph-motorcycles/domain/errors/user/UnexpectedError';

export class CreateBreakdownUsecase {
  constructor(
    private readonly breakdownRepository: BreakdownRepository,
    private readonly motorcycleRepository: MotorcycleRepository,
    private readonly warrantyRepository: WarrantyRepository,
  ) {}

  public async execute(
    motorcycleId: string,
    description: string,
    warrantyId: string | null,
  ): Promise<void | Error> {
    const motorcycle = await this.motorcycleRepository.findOneById(
      motorcycleId,
    );
    if (motorcycle instanceof Error) return motorcycle;

    let warranty: WarrantyEntity | null = null;
    if (warrantyId) {
      const foundWarranty = await this.warrantyRepository.findById(warrantyId);
      if (foundWarranty instanceof Error) return foundWarranty;
      warranty = foundWarranty;
    }

    const breakdown = BreakdownEntity.create(
      null,
      motorcycle,
      description,
      new Date(),
      warranty,
    );
    if (breakdown instanceof Error) return breakdown;

    try {
      await this.breakdownRepository.save(breakdown);
    } catch (error) {
      return new UnexpectedError(
        `Failed to save breakdown: ${
          error instanceof Error ? error.message : 'Unknown error'
        }`,
      );
    }
  }
}
