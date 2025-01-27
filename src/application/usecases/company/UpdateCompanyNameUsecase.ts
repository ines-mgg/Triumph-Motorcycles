import { CompanyRepository } from '@triumph-motorcycles/application/repositories';
import { CompanyEntity } from '@triumph-motorcycles/domain/entities';
import { UnexpectedError } from '@triumph-motorcycles/domain/errors';

export class UpdateCompanyNameUsecase {
  public constructor(private readonly companyRepository: CompanyRepository) {}

  public async execute(
    company: CompanyEntity,
    newName: string,
  ): Promise<CompanyEntity | Error> {
    try {
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
