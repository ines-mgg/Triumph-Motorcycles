import { DriverRepositoryInterface } from '@triumph-motorcycles/application/repositories/DriverRepositoryInterface';
import { DriverEntity } from '@triumph-motorcycles/domain/entities/driver/DriverEntity';

export class GetAllDriversUsecase {
  constructor(private readonly driverRepository: DriverRepositoryInterface) {}

  async execute(): Promise<DriverEntity[] | Error> {
    return this.driverRepository.findAll();
  }
}
