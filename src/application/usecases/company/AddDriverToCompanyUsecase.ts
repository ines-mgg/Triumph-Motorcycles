import {
  DriverEntity,
  CompanyEntity,
} from '@triumph-motorcycles/domain/entities';
import { CompanyRepository } from '@triumph-motorcycles/application/repositories';
import { UnexpectedError } from '@triumph-motorcycles/domain/errors';

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
