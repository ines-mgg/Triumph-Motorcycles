import { UnexpectedError } from '@triumph-motorcycles/domain/errors/user/UnexpectedError';
import { LocationEntity } from '@triumph-motorcycles/domain/entities/location/LocationEntity';
import { LocationRepositoryInterface } from '@triumph-motorcycles/application/repositories/LocationRepositoryInterface';

export class UpdateLocationUsecase {
  constructor(
    private readonly locationRepository: LocationRepositoryInterface,
  ) {}

  public async execute(
    location: LocationEntity,
  ): Promise<LocationEntity | Error> {
    try {
      const existingLocation = await this.locationRepository.findById(
        location.id,
      );
      if (existingLocation instanceof Error) return existingLocation;

      existingLocation.startDate = location.startDate;
      existingLocation.endDate = location.endDate;
      existingLocation.status = location.status;
      existingLocation.cost = location.cost;

      return await this.locationRepository.update(existingLocation);
    } catch (error) {
      return new UnexpectedError(
        error instanceof Error ? error.message : String(error),
      );
    }
  }
}
