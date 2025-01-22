import { CompanyRepository } from "src/application/repositories/CompanyRepository";
import { CompanyEntity } from "src/domain/entities/company/CompanyEntity";
import { UnexpectedError } from "src/domain/errors/user/UnexpectedError";

export class UpdateCompanyNameUsecase {
  public constructor(
    private readonly companyRepository: CompanyRepository
  ) {}

  public async execute(company: CompanyEntity, newName: string): Promise<CompanyEntity | Error> {
    try {
      const error = company.updateName(newName);
      if (error instanceof Error) return error;

      await this.companyRepository.update(company);  
      return company;
    } catch (error) {
      return new UnexpectedError(error instanceof Error ? error.message : String(error));
    }
  }
}
