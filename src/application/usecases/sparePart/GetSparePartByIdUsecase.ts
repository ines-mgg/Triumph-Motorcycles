import { SparePartEntity } from "@triumph-motorcycles/domain/entities/parts";
import { SparePartRepository } from "../../repositories/SparePartRepository";

export class GetSparePartByIdUsecase {
  constructor(
    private readonly sparePartRepository: SparePartRepository,
  ) {}

  public async execute(id: string): Promise<SparePartEntity | Error> {
    return await this.sparePartRepository.findById(id);
  }
}
