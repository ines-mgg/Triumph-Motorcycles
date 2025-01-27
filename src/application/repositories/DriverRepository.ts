import { DriverEntity } from '@triumph-motorcycles/domain/entities';
import { DriverNotFoundError } from '@triumph-motorcycles/domain/errors';

export interface DriverRepository {
  save(driver: DriverEntity): Promise<void>;
  findOneById(driverId: string): Promise<DriverEntity | DriverNotFoundError>;
  findAllByUser(userId: string): Promise<DriverEntity[] | DriverNotFoundError>;
  delete(driverId: string): Promise<void>;
  all(): Promise<DriverEntity[]>;
}
