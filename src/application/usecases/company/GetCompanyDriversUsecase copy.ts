import { CompanyRepository } from "@triumph-motorcycles/application/repositories/CompanyRepository";
import { DriverEntity } from "@triumph-motorcycles/domain/entities/drives/DriverEntity";


export class GetCompanyDriversUsecase {
    public constructor(private readonly companyRepository: CompanyRepository) {}
  
    public async execute(companyId: string): Promise<Error | DriverEntity[]> {
      const company = await this.companyRepository.findById(companyId);
      if (company instanceof Error) return company

      return company.getDrivers();
    }
  }
  