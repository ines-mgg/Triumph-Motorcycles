import { MotorcycleEntity } from "@triumph-motorcycles/domain/entities/drives";
import { CompanyRepository } from "src/application/repositories/CompanyRepository";
import { CompanyEntity } from "src/domain/entities/company/CompanyEntity";
import { UnexpectedError } from "src/domain/errors/user/UnexpectedError";

export class AddMotorcycleToCompanyUsecase {
  public constructor(
    private readonly companyRepository: CompanyRepository
  ) {}

  public async execute(company: CompanyEntity, motorcycle: MotorcycleEntity): Promise<CompanyEntity | Error> {
    try {
      company.addMotorcycle(motorcycle);
      await this.companyRepository.update(company);  

      return company;
    } catch (error) {
      return new UnexpectedError(error instanceof Error ? error.message : String(error));
    }
  }
}
