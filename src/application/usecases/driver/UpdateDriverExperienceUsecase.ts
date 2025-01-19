import { DriverNotFoundError } from "../../../domain/errors/driver/DriverNotFoundError";
import { DriverRepository } from "../../repositories/DriverRepository";

export class UpdateDriverExperienceUsecase {
  constructor(private readonly driverRepository: DriverRepository) {}

  public async execute(driverId: string, newYearsOfExperience: number): Promise<void | Error> {
    const driver = await this.driverRepository.findOneById(driverId);

    if (!driver) {
      throw new DriverNotFoundError();
    }
      driver.updateExperience(newYearsOfExperience);
      
      await this.driverRepository.save(driver);
  }
}
