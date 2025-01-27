import { SparePartRepository } from '@triumph-motorcycles/application/repositories';
import { SparePartEntity } from '@triumph-motorcycles/domain/entities';


export class GetSparePartByIdUsecase {
  constructor(private readonly sparePartRepository: SparePartRepository) {}

  public async execute(id: string): Promise<SparePartEntity | Error> {
    return await this.sparePartRepository.findById(id);
  }
}
