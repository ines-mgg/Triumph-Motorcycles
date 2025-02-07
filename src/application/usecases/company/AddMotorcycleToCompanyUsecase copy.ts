import { CompanyRepository } from "@triumph-motorcycles/application/repositories/CompanyRepository";
import { MotorcycleRepository } from "@triumph-motorcycles/application/repositories/MotorcycleRepository";
import { UnexpectedError } from "@triumph-motorcycles/domain/errors/user/UnexpectedError";


export class AddMotorcycleToCompanyUsecase {
  public constructor(
    private readonly companyRepository: CompanyRepository,
    private readonly motorcycleRepository: MotorcycleRepository
  ) {}

  public async execute(companyId: string, motorcycleId: string): Promise< void | Error> {
    try {
      const company = await this.companyRepository.findById(companyId);
      const motorcycle = await this.motorcycleRepository.findById(companyId);

      if (company instanceof Error) return company
      if (motorcycle instanceof Error) return motorcycle

      
      company.addMotorcycle(motorcycle);
      
      return await this.companyRepository.addMotorcycle(companyId, motorcycleId);  

    } catch (error) {
      return new UnexpectedError(error instanceof Error ? error.message : String(error));
    }
  }
}
