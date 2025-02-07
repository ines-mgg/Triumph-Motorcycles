import { CompanyRepository } from "@triumph-motorcycles/application/repositories/CompanyRepository";
import { CompanyEntity } from "@triumph-motorcycles/domain/entities/company/CompanyEntity";
import { UnexpectedError } from "@triumph-motorcycles/domain/errors/user/UnexpectedError";


export class GetAllCompaniesUsecase {
  constructor(private readonly companyRepository: CompanyRepository) {}

  public async execute(): Promise<CompanyEntity[] | Error> {
    try {
      const companies = await this.companyRepository.findAll();
      return companies;
    } catch (error) {
      return new UnexpectedError(error instanceof Error ? error.message : String(error));
    }
  }
}
