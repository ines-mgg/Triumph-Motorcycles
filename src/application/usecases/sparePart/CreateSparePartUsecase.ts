import { SparePartRepository } from '@triumph-motorcycles/application/repositories/SparePartRepository';
import { SparePartEntity } from '@triumph-motorcycles/domain/entities/parts/SparePartEntity';

export class CreateSparePartUsecase {
  constructor(private readonly sparePartRepository: SparePartRepository) {}

  public async execute(
    nameValue: string,
    quantityInStockValue: number,
    criticalLevelValue: number,
    costValue: number,
  ): Promise<void | Error> {
    const sparePart = SparePartEntity.create(
      nameValue,
      quantityInStockValue,
      criticalLevelValue,
      costValue,
    );

    if (sparePart instanceof Error) return sparePart;

    await this.sparePartRepository.save(sparePart);
  }
}
