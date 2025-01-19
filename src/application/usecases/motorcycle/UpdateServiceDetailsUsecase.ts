import { MotorcycleNotFoundError } from "../../../domain/errors/motorcycle/MotorcycleNotFoundError";
import { MotorcycleRepository } from "../../repositories/MotorcycleRepository";

export class UpdateServiceDetailsUsecase {
  constructor(private readonly motorcycleRepository: MotorcycleRepository) {}

  public async execute(id: string, newServiceMileage: number, serviceDate: Date): Promise<void | Error> {
    const motorcycle = await this.motorcycleRepository.findOneById(id);

    if (!motorcycle) {
      throw new MotorcycleNotFoundError();
    }
      motorcycle.updateServiceDetails(newServiceMileage, serviceDate);

      await this.motorcycleRepository.save(motorcycle);
  }
}
