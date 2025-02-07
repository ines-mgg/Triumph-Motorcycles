import { DriverEntity } from '@triumph-motorcycles/domain/entities/driver/DriverEntity';
import { DriverRepositoryInterface } from '@triumph-motorcycles/application/repositories/DriverRepositoryInterface';

export class GetDriverByIdUseCase {
  constructor(private readonly driverRepository: DriverRepositoryInterface) {}

  async execute(id: string): Promise<DriverEntity | Error> {
    return this.driverRepository.findOneById(id);
  }
}
