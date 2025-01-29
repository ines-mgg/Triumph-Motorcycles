import { DriverEntity } from '@triumph-motorcycles/domain/entities/drives/DriverEntity';

export class RemoveDriverFromCompanyUseCase {
  execute(driver: DriverEntity): void {
    driver.removeFromCompany();
  }
}
