import { CompanyRepository } from "@triumph-motorcycles/application/repositories/CompanyRepository";


export class RemoveConcessionFromCompanyUseCase {
  constructor(
    private readonly companyRepository: CompanyRepository
  ) {}

  async execute(companyId: string, concessionId: string): Promise<void | Error> {
    const company = await this.companyRepository.findById(companyId);
    if (company instanceof Error)  return company
    
    company.removeConcession(concessionId);

    return await this.companyRepository.removeConcession(companyId, concessionId);
  }
}
