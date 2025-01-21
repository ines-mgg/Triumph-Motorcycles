import { DriverRepository } from "../../repositories/DriverRepository";

export class UpdateDriverContactInfoUsecase {
  constructor(private readonly driverRepository: DriverRepository) {}

  public async execute(
    driverId: string,
    newEmail: string,
    newPhone: string,
  ): Promise<void | Error> {
    const driver = await this.driverRepository.findOneById(driverId);

    if(driver instanceof Error) return driver

    driver.updateContactInfo({ email: newEmail, phone: newPhone });
    await this.driverRepository.save(driver);
  }
}
