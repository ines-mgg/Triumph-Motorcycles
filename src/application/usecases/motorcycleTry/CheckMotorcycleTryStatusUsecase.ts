import { MotorcycleTryNotFoundError } from "../../../domain/errors/motorcycleTry/MotorcycleTestNotFoundError";
import { MotorcycleTryRepository } from "../../repositories/MotorcycleTryRepository";

export class CheckMotorcycleTryStatusUsecase {
  constructor(private readonly motorcycleTryRepository: MotorcycleTryRepository) {}

  public async execute(id: string): Promise<boolean | Error> {
    const motorcycleTry = await this.motorcycleTryRepository.findOneById(id);

    if (!motorcycleTry) {
      throw new MotorcycleTryNotFoundError();
    }

    return motorcycleTry.isTestOngoing();
  }
}
