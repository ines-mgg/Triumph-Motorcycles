import { DriverEntity } from '@triumph-motorcycles/domain/entities';
import { LicenseType } from '@triumph-motorcycles/domain/types';
import { DriverRepository } from '@triumph-motorcycles/application/repositories';

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

    if (driver instanceof Error) return driver;

    await this.driverRepository.save(driver);
  }
}
