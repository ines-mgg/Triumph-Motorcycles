import { RepairRepositoryInterface } from "@triumph-motorcycles/application/repositories/RepairRepositoryInterface";
import { RepairEntity } from "@triumph-motorcycles/domain/entities/repair/RepairEntity";


export class GetAllRepairsUsecase {
  constructor(
    private readonly repairRepository: RepairRepositoryInterface,
  ) {}

  public async execute(): Promise<RepairEntity[] | Error> {
    return await this.repairRepository.findAll();
  }
}
