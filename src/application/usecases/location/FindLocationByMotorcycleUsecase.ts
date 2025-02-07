import { LocationRepositoryInterface } from '@triumph-motorcycles/application/repositories/LocationRepositoryInterface';
import { LocationEntity } from '@triumph-motorcycles/domain/entities/location/LocationEntity';
import { UnexpectedError } from '@triumph-motorcycles/domain/errors/user/UnexpectedError';

export class FindLocationByMotorcycleUsecase {
  constructor(
    private readonly locationRepository: LocationRepositoryInterface,
  ) {}

  public async execute(
    motorcycleId: string,
  ): Promise<LocationEntity[] | Error> {
    try {
      return await this.locationRepository.findByMotorcycleId(motorcycleId);
    } catch (error) {
      return new UnexpectedError(
        error instanceof Error ? error.message : String(error),
      );
    }
  }
}
