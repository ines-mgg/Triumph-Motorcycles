import { DriverRepository } from "../../repositories/DriverRepository";

export class UpdateDriverExperienceUsecase {
  constructor(private readonly driverRepository: DriverRepository) {}

  public async execute(driverId: string, newYearsOfExperience: number): Promise<void | Error> {
    const driver = await this.driverRepository.findOneById(driverId);

    if(driver instanceof Error) return driver
    
    driver.updateExperience(newYearsOfExperience);
      
    await this.driverRepository.save(driver);
  }
}
