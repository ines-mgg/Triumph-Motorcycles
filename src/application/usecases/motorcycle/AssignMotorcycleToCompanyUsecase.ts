import { MotorcycleRepository } from '@triumph-motorcycles/application/repositories/MotorcycleRepository';
import { CompanyRepository } from '@triumph-motorcycles/application/repositories/CompanyRepository';

export class AssignMotorcycleToCompanyUsecase {
  constructor(
    private readonly motorcycleRepository: MotorcycleRepository,
    private readonly companyRepository: CompanyRepository,
  ) {}

  public async execute(
    motorcycleId: string,
    companyId: string,
  ): Promise<void | Error> {
    const motorcycle =
      await this.motorcycleRepository.findOneById(motorcycleId);
    if (motorcycle instanceof Error) return motorcycle;

    const company = await this.companyRepository.findById(companyId);
    if (company instanceof Error) return company;

    motorcycle.assignToCompany(company);

    await this.motorcycleRepository.update(motorcycle);
  }
}
