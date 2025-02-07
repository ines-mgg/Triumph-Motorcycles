import { MotorcycleRepositoryInterface } from "@triumph-motorcycles/application/repositories/MotorcycleRepositoryInterface";
import { WarrantyRepositoryInterface } from "@triumph-motorcycles/application/repositories/WarrantyRepositoryInterface";
import { WarrantyEntity } from "@triumph-motorcycles/domain/entities/warranty/WarrantyEntity";


export class CreateWarrantyUsecase {
  constructor(
    private readonly warrantyRepository: WarrantyRepositoryInterface,
    private readonly motorcycleRepository : MotorcycleRepositoryInterface
  ) {}

  async execute(
    motorcycleId: string,
    startDateValue: Date,
    endDateValue: Date,
    coverageDetailsValue: string,
    isActive: boolean,
  ): Promise<WarrantyEntity | Error> {

    const motorcycle = await this.motorcycleRepository.findById(motorcycleId);
    if (motorcycle instanceof Error) return motorcycle;


    const warranty = WarrantyEntity.create(
      null,
      motorcycle,
      startDateValue,
      endDateValue,
      coverageDetailsValue,
      isActive
    );
    if (warranty instanceof Error) return warranty;  
  
    return await this.warrantyRepository.save(warranty);

  }
}
