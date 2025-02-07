import { SparePartRepositoryInterface } from "@triumph-motorcycles/application/repositories/SparePartRepositoryInterface";
import { SparePartEntity } from "@triumph-motorcycles/domain/entities/order/SparePartEntity";

export class GetAllSparePartsUsecase {
  constructor(
    private readonly sparePartRepository: SparePartRepositoryInterface,
  ) {}

  public async execute(): Promise<SparePartEntity[] | Error> {
    return await this.sparePartRepository.findAll();
  }
}
