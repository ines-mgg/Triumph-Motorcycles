import { CompanyRepositoryInterface } from '@triumph-motorcycles/application/repositories/CompanyRepositoryInterface';
import { CompanyEntity } from '@triumph-motorcycles/domain/entities/company/CompanyEntity';
import { UnexpectedError } from '@triumph-motorcycles/domain/errors/user/UnexpectedError';

export class GetCompanyByIdUsecase {
  public constructor(
    private readonly companyRepository: CompanyRepositoryInterface,
  ) {}

  public async execute(companyId: string): Promise<CompanyEntity | Error> {
    try {
      const company = await this.companyRepository.findById(companyId);
      if (company instanceof Error) return company;

      return company;
    } catch (error) {
      return new UnexpectedError(
        error instanceof Error ? error.message : String(error),
      );
    }
  }
}
