import { CompanyRepositoryInterface } from '@triumph-motorcycles/application/repositories/CompanyRepositoryInterface';
import { DriverRepositoryInterface } from '@triumph-motorcycles/application/repositories/DriverRepositoryInterface';
import { UnexpectedError } from '@triumph-motorcycles/domain/errors/user/UnexpectedError';

export class AddDriverToCompanyUsecase {
  public constructor(
    private readonly companyRepository: CompanyRepositoryInterface,
    private readonly driverRepository: DriverRepositoryInterface,
  ) {}

  public async execute(
    companyId: string,
    driverId: string,
  ): Promise<void | Error> {
    try {
      const company = await this.companyRepository.findById(companyId);
      const driver = await this.driverRepository.findOneById(driverId);

      if (company instanceof Error) return company;
      if (driver instanceof Error) return driver;

      company.addDriver(driver);

      return await this.companyRepository.addDriver(companyId, driverId);
    } catch (error) {
      return new UnexpectedError(
        error instanceof Error ? error.message : String(error),
      );
    }
  }
}
