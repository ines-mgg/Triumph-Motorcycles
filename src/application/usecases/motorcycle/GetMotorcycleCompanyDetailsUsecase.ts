import { MotorcycleRepositoryInterface } from '@triumph-motorcycles/application/repositories/MotorcycleRepositoryInterface';
import { CompanyRepositoryInterface } from '@triumph-motorcycles/application/repositories/CompanyRepositoryInterface';


export class GetMotorcycleCompanyDetailsUsecase {
  constructor(
    private readonly motorcycleRepository: MotorcycleRepositoryInterface,
    private readonly companyRepository: CompanyRepositoryInterface,
  ) {}

  public async execute(motorcycleId: string): Promise<object | null | Error> {
    const motorcycle = await this.motorcycleRepository.findById(motorcycleId);
    if (motorcycle instanceof Error) return motorcycle;

    const company = await this.companyRepository.findById(
      motorcycle.company.id,
    );
    if (company instanceof Error) return company;

    return company;
  }
}
