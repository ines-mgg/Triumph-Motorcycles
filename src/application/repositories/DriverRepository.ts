import { DriverEntity } from '@triumph-motorcycles/domain/entities/drives/DriverEntity';
import { DriverNotFoundError } from '@triumph-motorcycles/domain/errors/driver/DriverNotFoundError';

export interface DriverRepository {
  save(driver: DriverEntity): Promise<void>;
  findOneById(driverId: string): Promise<DriverEntity | DriverNotFoundError>;
  findAllByUser(userId: string): Promise<DriverEntity[] | DriverNotFoundError>;
  delete(driverId: string): Promise<void>;
  all(): Promise<DriverEntity[]>;
}
