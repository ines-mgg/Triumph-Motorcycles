import { CompanyEntity } from '@triumph-motorcycles/domain/entities/company/CompanyEntity';
import { DriverEntity } from '@triumph-motorcycles/domain/entities/drives/DriverEntity';

export class GetCompanyDriversUsecase {
  public execute(company: CompanyEntity): DriverEntity[] {
    return company.getDrivers();
  }
}
