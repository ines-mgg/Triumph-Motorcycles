import { LocationEntity } from '@triumph-motorcycles/domain/entities/location/LocationEntity';
import { LocationRepositoryInterface } from '@triumph-motorcycles/application/repositories/LocationRepositoryInterface';

export class GetLocationByIdUsecase {
  constructor(
    private readonly locationRepository: LocationRepositoryInterface,
  ) {}

  public async execute(id: string): Promise<LocationEntity | Error> {
    return await this.locationRepository.findById(id);
  }
}
