import { DriverRepositoryInterface } from '@triumph-motorcycles/application/repositories/DriverRepositoryInterface';
import { DrivingRecord } from '@triumph-motorcycles/domain/types/motorcycle';


export class AddDrivingRecordUsecase {
  constructor(private readonly driverRepository: DriverRepositoryInterface) {}

  public async execute(
    id: string,
    record: DrivingRecord,
  ): Promise<void | Error> {
    const driver = await this.driverRepository.findOneById(id);

    if (driver instanceof Error) return driver;

    driver.addDrivingRecord(record);

    const { date, motorcycleId, type, details } = record;
    await this.driverRepository.addRecord(
      id,
      date,
      motorcycleId,
      type,
      details,
    );
  }
}
