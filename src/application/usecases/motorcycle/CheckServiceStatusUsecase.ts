import { MotorcycleNotFoundError } from "../../../domain/errors/motorcycle/MotorcycleNotFoundError";
import { MotorcycleRepository } from "../../repositories/MotorcycleRepository";

export class CheckServiceStatusUsecase {
  constructor(private readonly motorcycleRepository: MotorcycleRepository) {}

  public async execute(id: string): Promise<boolean | Error> {
    const motorcycle = await this.motorcycleRepository.findOneById(id);

    if (!motorcycle) {
      throw new MotorcycleNotFoundError();
    }

    return motorcycle.needsService();
  }
}
