import { DriverEntity } from "@triumph-motorcycles/domain/entities/driver/DriverEntity";
import { DriverRepositoryInterface } from "@triumph-motorcycles/application/repositories/DriverRepositoryInterface";


export class UpdateDriverExperienceUsecase {
  constructor(private readonly driverRepository: DriverRepositoryInterface) {}

  public async execute(driverId: string, newYearsOfExperience: number): Promise<DriverEntity | Error> {
    const driver = await this.driverRepository.findOneById(driverId);

    if(driver instanceof Error) return driver
    
    driver.updateExperience(newYearsOfExperience);
      
    return await this.driverRepository.updateExperience(driverId, newYearsOfExperience);
  }
}
