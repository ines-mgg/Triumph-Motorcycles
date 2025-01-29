import { DriverEntity } from '@triumph-motorcycles/domain/entities/drives/DriverEntity';
import { CompanyEntity } from '@triumph-motorcycles/domain/entities/company/CompanyEntity';

export class AssignDriverToCompanyUseCase {
  execute(driver: DriverEntity, company: CompanyEntity): void {
    driver.assignToCompany(company);
    console.log(
      `Driver ${driver.name.value} has been assigned to company ${company.name.value}.`,
    );
  }
}
