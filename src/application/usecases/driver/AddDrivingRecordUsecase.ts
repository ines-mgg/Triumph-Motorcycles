import { DrivingRecord } from '@triumph-motorcycles/domain/types/motorcycle';
import { DriverRepository } from '@triumph-motorcycles/application/repositories/DriverRepository';

export class AddDrivingRecordUsecase {
  constructor(private readonly driverRepository: DriverRepository) {}

  public async execute(
    driverId: string,
    record: DrivingRecord,
  ): Promise<void | Error> {
    const driver = await this.driverRepository.findOneById(driverId);

    if (driver instanceof Error) return driver;

    driver.addDrivingRecord(record);

    await this.driverRepository.save(driver);
  }
}
