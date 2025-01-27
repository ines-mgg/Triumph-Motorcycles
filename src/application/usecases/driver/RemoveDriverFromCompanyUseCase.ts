import { DriverEntity } from '@triumph-motorcycles/domain/entities';

export class RemoveDriverFromCompanyUseCase {
  execute(driver: DriverEntity): void {
    driver.removeFromCompany();
  }
}
