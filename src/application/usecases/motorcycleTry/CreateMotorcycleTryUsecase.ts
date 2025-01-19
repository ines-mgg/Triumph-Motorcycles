import { DriverEntity, MotorcycleEntity, MotorcycleTryEntity } from "@triumph-motorcycles/domain/entities/drives";
import { MotorcycleTryRepository } from "../../repositories/MotorcycleTryRepository";

export class CreateMotorcycleTryUsecase {
  constructor(private readonly motorcycleTryRepository: MotorcycleTryRepository) {}

  public async execute(
    id: string,
    motorcycle: MotorcycleEntity,
    driver: DriverEntity,
    startDate: Date,
  ): Promise<void | Error> {
    const motorcycleTry = MotorcycleTryEntity.create(id, motorcycle, driver, startDate);

    if (motorcycleTry instanceof Error) {
      return motorcycleTry;
    }

    await this.motorcycleTryRepository.save(motorcycleTry);
  }
}
