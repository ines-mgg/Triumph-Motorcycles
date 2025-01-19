import { MotorcycleNotFoundError } from "../../../domain/errors/motorcycle/MotorcycleNotFoundError";
import { MotorcycleRepository } from "../../repositories/MotorcycleRepository";

export class UpdateMileageUsecase {
  constructor(private readonly motorcycleRepository: MotorcycleRepository) {}

  public async execute(id: string, newMileage: number): Promise<void | Error> {
    const motorcycle = await this.motorcycleRepository.findOneById(id);

    if (!motorcycle) {
      throw new MotorcycleNotFoundError();
    }

    motorcycle.updateMileage(newMileage);
    await this.motorcycleRepository.save(motorcycle);
  }
}
