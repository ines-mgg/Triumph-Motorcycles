import { LocationRepositoryInterface } from '@triumph-motorcycles/application/repositories/LocationRepositoryInterface';
import { LocationEntity } from '@triumph-motorcycles/domain/entities/location/LocationEntity';
import { UnexpectedError } from '@triumph-motorcycles/domain/errors/user/UnexpectedError';
import { LocationStatus } from '@triumph-motorcycles/domain/types/LocationStatus';


export class FindLocationsByStatusUsecase {
  constructor(
    private readonly locationRepository: LocationRepositoryInterface,
  ) {}

  public async execute(
    status: LocationStatus,
  ): Promise<LocationEntity[] | Error> {
    try {
      return await this.locationRepository.findByStatus(status);
    } catch (error) {
      return new UnexpectedError(
        error instanceof Error ? error.message : String(error),
      );
    }
  }
}
