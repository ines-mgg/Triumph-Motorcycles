import { CompanyRepository } from '@triumph-motorcycles/application/repositories/CompanyRepository';
import { CompanyEntity } from '@triumph-motorcycles/domain/entities/company/CompanyEntity';
import { UserEntity } from '@triumph-motorcycles/domain/entities/user/UserEntity';
import { UnexpectedError } from '@triumph-motorcycles/domain/errors/user/UnexpectedError';

export class CreateCompanyUsecase {
  public constructor(private readonly companyRepository: CompanyRepository) {}

  public async execute(
    name: string,
    user: UserEntity,
  ): Promise<CompanyEntity | Error> {
    try {
      const company = CompanyEntity.create(name, user);
      if (company instanceof Error) return company;

      await this.companyRepository.save(company);
      return company;
    } catch (error) {
      return new UnexpectedError(
        error instanceof Error ? error.message : String(error),
      );
    }
  }
}
