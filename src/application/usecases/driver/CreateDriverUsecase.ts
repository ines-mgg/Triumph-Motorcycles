import { DriverRepositoryInterface } from '@triumph-motorcycles/application/repositories/DriverRepositoryInterface';
import { DriverEntity } from '@triumph-motorcycles/domain/entities/driver/DriverEntity';
import { CompanyEntity } from '@triumph-motorcycles/domain/entities/company/CompanyEntity';
import { UserEntity } from '@triumph-motorcycles/domain/entities/user/UserEntity';
import { LicenseType } from '@triumph-motorcycles/domain/types/motorcycle';

export class CreateDriverUsecase {
  constructor(private readonly driverRepository: DriverRepositoryInterface) {}

  public async execute(
    name: string,
    licenseType: LicenseType,
    license: string,
    yearsOfExperience: number,
    email: string,
    phone: string,
    company: CompanyEntity | null = null,
    user: UserEntity | null = null,
  ): Promise<DriverEntity | Error> {
    const driver = DriverEntity.create(
      null,
      name,
      licenseType,
      license,
      yearsOfExperience,
      email,
      phone,
      null,
      null,
      company,
      user,
    );

    if (driver instanceof Error) return driver;

    return await this.driverRepository.create(driver);
  }
}
