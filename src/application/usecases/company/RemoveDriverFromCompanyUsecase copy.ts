import { CompanyRepository } from "@triumph-motorcycles/application/repositories/CompanyRepository";
import { UnexpectedError } from "@triumph-motorcycles/domain/errors/user/UnexpectedError";


export class RemoveDriverFromCompanyUsecase {
    public constructor(private readonly companyRepository: CompanyRepository) {}
  
    public async execute(companyId: string, driverId: string): Promise<void | Error> {
      try {
        const company = await this.companyRepository.findById(companyId);
        if (company instanceof Error)  return company
        
        company.removeDriver(driverId);

        return await this.companyRepository.removeDriver(companyId, driverId);

      } catch (error) {
        return new UnexpectedError(error instanceof Error ? error.message : String(error));
      }
    }
  }
  