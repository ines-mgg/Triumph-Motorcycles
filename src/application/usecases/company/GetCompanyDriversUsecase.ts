import { CompanyRepositoryInterface } from '@triumph-motorcycles/application/repositories/CompanyRepositoryInterface';
import { DriverEntity } from '@triumph-motorcycles/domain/entities/driver/DriverEntity';

export class GetCompanyDriversUsecase {
  public constructor(
    private readonly companyRepository: CompanyRepositoryInterface,
  ) {}

  public async execute(companyId: string): Promise<Error | DriverEntity[]> {
    const company = await this.companyRepository.findById(companyId);
    if (company instanceof Error) return company;

    return company.getDrivers();
  }
}
