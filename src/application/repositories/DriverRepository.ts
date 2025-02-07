import { DriverEntity } from '@triumph-motorcycles/domain/entities/drives/DriverEntity';
import { DriverNotFoundError } from '@triumph-motorcycles/domain/errors/driver/DriverNotFoundError';

export interface DriverRepository {
  create(driver: DriverEntity): Promise<DriverEntity | Error>;
  save(driver: DriverEntity): Promise<void>;
  findOneById(driverId: string): Promise<DriverEntity | DriverNotFoundError>;
  findAllByUser(userId: string): Promise<DriverEntity[] | DriverNotFoundError>;
  delete(driverId: string): Promise<void>;
  all(): Promise<DriverEntity[]>;
  update(driver: DriverEntity): Promise<DriverEntity | Error>;
  updateExperience(
    driverId: string,
    year: number,
  ): Promise<DriverEntity | Error>;
  addRecord(
    id: string,
    date: Date,
    motorcycleId: string,
    type: string,
    details: string,
  );
  updateContactInfo(
    driverId: string,
    email: string,
    phone: string,
  ): Promise<void>;
  assignCompany(driverId: string, companyId: string): Promise<void | Error>;
  removeCompany(driverId: string): Promise<void | Error>;
}
