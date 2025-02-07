import { CompanyRepository } from "@triumph-motorcycles/application/repositories/CompanyRepository";
import { ConcessionRepository } from "@triumph-motorcycles/application/repositories/ConcessionRepository";


export class AssignConcessionToCompanyUseCase {
  constructor(
    private readonly concessionRepository: ConcessionRepository,
    private readonly companyRepository: CompanyRepository
  ) {}

  async execute(concessionId: string, companyId: string): Promise<void | Error> {
    const concession = await this.concessionRepository.findById(concessionId);
    if (concession instanceof Error) return concession
    
    const company = await this.companyRepository.findById(companyId);

    if (company instanceof Error) throw company
  
    company.addConcession(concession);

    return await this.concessionRepository.addCompany(concessionId, companyId);
  }
}
