import { DriverNotFoundError } from "../../../domain/errors/driver/DriverNotFoundError";
import { DriverRepository } from "../../repositories/DriverRepository";

export class CheckIncidentHistoryUsecase {
  constructor(private readonly driverRepository: DriverRepository) {}

  public async execute(driverId: string): Promise<boolean | Error> {
    const driver = await this.driverRepository.findOneById(driverId);

    if (!driver) {
      throw new DriverNotFoundError();
    }

    return driver.hasIncidentHistory();
  }
}
