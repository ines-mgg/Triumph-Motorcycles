import { CompanyRepositoryInterface } from '@triumph-motorcycles/application/repositories/CompanyRepositoryInterface';
import { UnexpectedError } from '@triumph-motorcycles/domain/errors/user/UnexpectedError';
import { CompanyEntity } from '@triumph-motorcycles/domain/entities/company/CompanyEntity';

export class UpdateCompanyNameUsecase {
  public constructor(
    private readonly companyRepository: CompanyRepositoryInterface,
  ) {}

  public async execute(
    companyId: string,
    newName: string,
  ): Promise<CompanyEntity | Error> {
    try {
      const company = await this.companyRepository.findById(companyId);

      if (company instanceof Error) return company;

      const error = company.updateName(newName);

      if (error instanceof Error) return error;

      await this.companyRepository.update(company);

      return company;
    } catch (error) {
      return new UnexpectedError(
        error instanceof Error ? error.message : String(error),
      );
    }
  }
}
