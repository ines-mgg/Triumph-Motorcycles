import {
  CompanyEntity,
  DriverEntity,
} from '@triumph-motorcycles/domain/entities';

export class GetCompanyDriversUsecase {
  public execute(company: CompanyEntity): DriverEntity[] {
    return company.getDrivers();
  }
}
