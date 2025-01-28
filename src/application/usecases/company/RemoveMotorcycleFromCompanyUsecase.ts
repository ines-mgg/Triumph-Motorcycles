import { CompanyRepository } from '@triumph-motorcycles/application/repositories/CompanyRepository';
import { CompanyEntity } from '@triumph-motorcycles/domain/entities/company/CompanyEntity';
import { UnexpectedError } from '@triumph-motorcycles/domain/errors/user/UnexpectedError';

export class RemoveMotorcycleFromCompanyUsecase {
  public constructor(private readonly companyRepository: CompanyRepository) {}

  public async execute(
    company: CompanyEntity,
    motorcycleId: string,
  ): Promise<CompanyEntity | Error> {
    try {
      company.removeMotorcycle(motorcycleId);
      await this.companyRepository.update(company);

      return company;
    } catch (error) {
      return new UnexpectedError(
        error instanceof Error ? error.message : String(error),
      );
    }
  }
}
