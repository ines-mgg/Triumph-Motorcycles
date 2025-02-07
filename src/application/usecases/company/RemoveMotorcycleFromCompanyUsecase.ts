import { UnexpectedError } from "@triumph-motorcycles/domain/errors/user/UnexpectedError";
import { CompanyRepositoryInterface } from "@triumph-motorcycles/application/repositories/CompanyRepositoryInterface";

export class RemoveMotorcycleFromCompanyUsecase {
  public constructor(
    private readonly companyRepository: CompanyRepositoryInterface,
  ) {}

  public async execute(companyId: string, motorcycleId: string): Promise<void | Error> {
    try {
      const company = await this.companyRepository.findById(companyId);

      if (company instanceof Error)  return company
      
      company.removeMotorcycle(motorcycleId);

      return await this.companyRepository.removeMotorcycle(companyId, motorcycleId); 

    } catch (error) {
      return new UnexpectedError(error instanceof Error ? error.message : String(error));
    }
  }
}
