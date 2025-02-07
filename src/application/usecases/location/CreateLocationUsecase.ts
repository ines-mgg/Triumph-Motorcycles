import { MotorcycleRepositoryInterface } from '@triumph-motorcycles/application/repositories/MotorcycleRepositoryInterface';
import { LocationRepositoryInterface } from '@triumph-motorcycles/application/repositories/LocationRepositoryInterface';
import { LocationEntity } from '@triumph-motorcycles/domain/entities/location/LocationEntity';
import { UnexpectedError } from '@triumph-motorcycles/domain/errors/user/UnexpectedError';
import { UserRepositoryInterface } from '@triumph-motorcycles/application/repositories/UserRepositoryInterface';

export class CreateLocationUsecase {
  constructor(
    private readonly locationRepository: LocationRepositoryInterface,
    private readonly motorcycleRepository: MotorcycleRepositoryInterface,
    private readonly userRepository: UserRepositoryInterface,
  ) {}

  public async execute(
    motorcycleId: string,
    userId: string,
    startDate: Date,
    endDate: Date,
    cost: number,
  ): Promise<void | Error> {
    try {
      const motorcycle = await this.motorcycleRepository.findById(motorcycleId);
      if (motorcycle instanceof Error) return motorcycle;

      const user = await this.userRepository.findOne(userId);
      if (user instanceof Error) return user;

      const locationEntity = LocationEntity.create(
        null,
        motorcycle,
        user,
        startDate,
        endDate,
        'in-progress',
        cost,
      );

      if (locationEntity instanceof Error) return locationEntity;

      await this.locationRepository.create(locationEntity);
    } catch (error) {
      return new UnexpectedError(
        error instanceof Error ? error.message : String(error),
      );
    }
  }
}
