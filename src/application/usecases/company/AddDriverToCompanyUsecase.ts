import { DriverEntity } from '@triumph-motorcycles/domain/entities/drives/DriverEntity';
import { CompanyEntity } from '@triumph-motorcycles/domain/entities/company/CompanyEntity';
import { CompanyRepository } from '@triumph-motorcycles/application/repositories/CompanyRepository';
import { UnexpectedError } from '@triumph-motorcycles/domain/errors/user/UnexpectedError';

export class AddDriverToCompanyUsecase {
  public constructor(private readonly companyRepository: CompanyRepository) {}

  public async execute(
    company: CompanyEntity,
    driver: DriverEntity,
  ): Promise<CompanyEntity | Error> {
    try {
      company.addDriver(driver);
      await this.companyRepository.update(company);

      return company;
    } catch (error) {
      return new UnexpectedError(
        error instanceof Error ? error.message : String(error),
      );
    }
  }
}
