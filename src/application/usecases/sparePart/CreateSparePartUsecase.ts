import { SparePartRepositoryInterface } from "@triumph-motorcycles/application/repositories/SparePartRepositoryInterface";
import { SparePartEntity } from "@triumph-motorcycles/domain/entities/order/SparePartEntity";


export class CreateSparePartUsecase {
  constructor(
    private readonly sparePartRepository: SparePartRepositoryInterface,
  ) {}

  public async execute(
    nameValue: string,
    quantityInStockValue: number,
    criticalLevelValue: number,
    costValue: number,
  ): Promise<void | Error> {
    const sparePart = SparePartEntity.create(
      null,
      nameValue,
      quantityInStockValue,
      criticalLevelValue,
      costValue
    );

    if(sparePart instanceof Error) return sparePart

    await this.sparePartRepository.save(sparePart);
  }
}
