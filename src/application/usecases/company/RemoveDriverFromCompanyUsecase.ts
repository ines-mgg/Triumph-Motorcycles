import { CompanyRepository } from '@triumph-motorcycles/application/repositories/CompanyRepository';
import { CompanyEntity } from '@triumph-motorcycles/domain/entities/company/CompanyEntity';
import { UnexpectedError } from '@triumph-motorcycles/domain/errors/user/UnexpectedError';

export class RemoveDriverFromCompanyUsecase {
  public constructor(private readonly companyRepository: CompanyRepository) {}

  public async execute(
    company: CompanyEntity,
    driverId: string,
  ): Promise<CompanyEntity | Error> {
    try {
      company.removeDriver(driverId);
      await this.companyRepository.update(company);

      return company;
    } catch (error) {
      return new UnexpectedError(
        error instanceof Error ? error.message : String(error),
      );
    }
  }
}
