import { DriverNotFoundError } from "../../../domain/errors/driver/DriverNotFoundError";
import { DrivingRecord } from "../../../domain/types/motorcycle";
import { DriverRepository } from "../../repositories/DriverRepository";

export class AddDrivingRecordUsecase {
  constructor(private readonly driverRepository: DriverRepository) {}

  public async execute(driverId: string, record: DrivingRecord): Promise<void | Error> {
    const driver = await this.driverRepository.findOneById(driverId);

    if (!driver) {
      throw new DriverNotFoundError();
    }

    driver.addDrivingRecord(record);
    await this.driverRepository.save(driver);
  }
}
