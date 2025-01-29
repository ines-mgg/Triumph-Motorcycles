import { DriverRepository } from '@triumph-motorcycles/application/repositories/DriverRepository';

export class CheckIncidentHistoryUsecase {
  constructor(private readonly driverRepository: DriverRepository) {}

  public async execute(driverId: string): Promise<boolean | Error> {
    const driver = await this.driverRepository.findOneById(driverId);

    if (driver instanceof Error) return driver;

    return driver.hasIncidentHistory();
  }
}
