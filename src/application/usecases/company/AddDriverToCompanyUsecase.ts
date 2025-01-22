import { DriverEntity } from "@triumph-motorcycles/domain/entities/drives";
import { CompanyEntity } from "src/domain/entities/company/CompanyEntity";
import { CompanyRepository } from "src/application/repositories/CompanyRepository";
import { UnexpectedError } from "src/domain/errors/user/UnexpectedError";

export class AddDriverToCompanyUsecase {
  public constructor(private readonly companyRepository: CompanyRepository) {}

  public async execute(company: CompanyEntity, driver: DriverEntity): Promise<CompanyEntity | Error> {
    try {
      company.addDriver(driver);
      await this.companyRepository.update(company);

      return company;
    } catch (error) {
      return new UnexpectedError(error instanceof Error ? error.message : String(error));
    }
  }
}
