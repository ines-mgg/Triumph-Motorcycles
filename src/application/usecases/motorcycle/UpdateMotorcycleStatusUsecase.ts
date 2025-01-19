import { MotorStatus } from "../../../domain/types/motorcycle.ts";
import { MotorcycleRepository } from "../../repositories/MotorcycleRepository.ts";

export class UpdateMotorcycleStatusUsecase {
  constructor(private readonly motorcycleRepository: MotorcycleRepository) {}

  public async execute(id: string, newStatus: MotorStatus): Promise<void | Error> {
    const motorcycle = await this.motorcycleRepository.findOneById(id);

    if (!motorcycle) {
      throw new Error("Motorcycle not found.");
    }

    motorcycle.updateStatus(newStatus);
    await this.motorcycleRepository.save(motorcycle);
  }
}
