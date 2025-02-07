import { LocationEntity } from '@triumph-motorcycles/domain/entities/location/LocationEntity';
import { LocationStatus } from '@triumph-motorcycles/domain/types/LocationStatus';

export interface LocationRepository {
  create(locationEntity: LocationEntity): Promise<void | Error>;
  update(updatedData): Promise<LocationEntity>;
  findById(id: string): Promise<LocationEntity | Error>;
  findByMotorcycleId(motorcycleId: string): Promise<LocationEntity[] | Error>;
  findByUserId(userId: string): Promise<LocationEntity[] | Error>;
  deleteById(id: string): Promise<boolean>;
  findByStatus(status: LocationStatus): Promise<LocationEntity[] | Error>;
  findAll(): Promise<LocationEntity[] | Error>;
  endLocation(id: string): Promise<void>;
  cancel(id: string): Promise<void>;
}