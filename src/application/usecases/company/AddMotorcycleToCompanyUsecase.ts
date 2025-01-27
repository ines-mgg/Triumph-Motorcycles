import { CompanyEntity, MotorcycleEntity } from '@triumph-motorcycles/domain/entities';
import { CompanyRepository } from '@triumph-motorcycles/application/repositories';
import { UnexpectedError } from '@triumph-motorcycles/domain/errors';

export class AddMotorcycleToCompanyUsecase {
  public constructor(private readonly companyRepository: CompanyRepository) {}

  public async execute(
    company: CompanyEntity,
    motorcycle: MotorcycleEntity,
  ): Promise<CompanyEntity | Error> {
    try {
      company.addMotorcycle(motorcycle);
      await this.companyRepository.update(company);

      return company;
    } catch (error) {
      return new UnexpectedError(
        error instanceof Error ? error.message : String(error),
      );
    }
  }
}
