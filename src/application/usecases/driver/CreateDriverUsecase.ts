import { DriverEntity } from "@triumph-motorcycles/domain/entities/drives";
import { LicenseType } from "../../../domain/types/motorcycle";
import { DriverRepository } from "../../repositories/DriverRepository";

export class CreateDriverUsecase {
  constructor(private readonly driverRepository: DriverRepository) {}

  public async execute(
    name: string,
    licenseType: LicenseType,
    license: string,
    yearsOfExperience: number,
    email: string,
    phone: string,
  ): Promise<void | Error> {
    const driver = DriverEntity.create(
      name,
      licenseType,
      license,
      yearsOfExperience,
      email,
      phone,
    );

    if(driver instanceof Error) return driver

    await this.driverRepository.save(driver);
  }
}
