import { LocationRepositoryInterface } from '@triumph-motorcycles/application/repositories/LocationRepositoryInterface';
import { LocationEntity } from '@triumph-motorcycles/domain/entities/location/LocationEntity';
import { UnexpectedError } from '@triumph-motorcycles/domain/errors/user/UnexpectedError';

export class CancelLocationUsecase {
  constructor(
    private readonly locationRepository: LocationRepositoryInterface,
  ) {}

  public async execute(locationId: string): Promise<void | Error> {
    try {
      const location = await this.locationRepository.findById(locationId);
      if (location instanceof Error) return location;

      const cancelResult = location.cancelLocation();
      if (cancelResult instanceof Error) return cancelResult;

      await this.locationRepository.cancel(locationId);
    } catch (error) {
      return new UnexpectedError(
        error instanceof Error ? error.message : String(error),
      );
    }
  }
}
