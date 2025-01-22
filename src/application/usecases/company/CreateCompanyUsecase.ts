import { CompanyRepository } from "src/application/repositories/CompanyRepository";
import { CompanyEntity } from "src/domain/entities/company/CompanyEntity";
import { UserEntity } from "src/domain/entities/user/UserEntity";
import { UnexpectedError } from "src/domain/errors/user/UnexpectedError";

export class CreateCompanyUsecase {
  public constructor(
    private readonly companyRepository: CompanyRepository
  ) {}

  public async execute(name: string, user: UserEntity): Promise<CompanyEntity | Error> {
    try {
      const company = CompanyEntity.create(name, user);
      if (company instanceof Error) return company;

      await this.companyRepository.save(company);  
      return company;
    } catch (error) {
      return new UnexpectedError(error instanceof Error ? error.message : String(error));
    }
  }
}
