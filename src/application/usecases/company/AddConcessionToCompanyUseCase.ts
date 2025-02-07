import { CompanyRepository } from "@triumph-motorcycles/application/repositories/CompanyRepository";
import { ConcessionRepository } from "@triumph-motorcycles/application/repositories/ConcessionRepository";


export class AddConcessionToCompanyUseCase {
  constructor(
    private readonly companyRepository: CompanyRepository,
    private readonly concessionRepository: ConcessionRepository,
  ) {}

  async execute(companyId: string, concessionId: string): Promise<void | Error> {
    const company = await this.companyRepository.findById(companyId);
    const concession = await this.concessionRepository.findById(concessionId);

    if (company instanceof Error) return company;
    if(concession instanceof Error) return concession;

    company.addConcession(concession);

    return await this.companyRepository.addConcession(companyId, concessionId);
  }
}
