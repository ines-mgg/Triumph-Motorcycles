import { DriverEntity } from "@triumph-motorcycles/domain/entities/drives";

export class RemoveDriverFromCompanyUseCase {
    execute(driver: DriverEntity): void {
        driver.removeFromCompany();
     
    }
  }