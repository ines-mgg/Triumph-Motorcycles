import { MotorcycleTryNotFoundError } from "../../../domain/errors/motorcycleTry/MotorcycleTestNotFoundError";
import { MotorcycleTryRepository } from "../../repositories/MotorcycleTryRepository";

export class EndMotorcycleTryUsecase {
  constructor(private readonly motorcycleTryRepository: MotorcycleTryRepository) {}

  public async execute(id: string, endDate: Date): Promise<void | Error> {
    const motorcycleTry = await this.motorcycleTryRepository.findOneById(id);

    if (!motorcycleTry) {
      throw new MotorcycleTryNotFoundError();
    }

    motorcycleTry.endTest(endDate);
    await this.motorcycleTryRepository.save(motorcycleTry);
  }
}
