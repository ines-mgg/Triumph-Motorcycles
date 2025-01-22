import { DriverEntity } from "@triumph-motorcycles/domain/entities/drives";
import { CompanyEntity } from "src/domain/entities/company/CompanyEntity";

export class GetCompanyDriversUsecase {
    public execute(company: CompanyEntity): DriverEntity[] {
      return company.getDrivers();
    }
  }
  