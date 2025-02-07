import { MotorcycleEntity } from '@triumph-motorcycles/domain/entities/drives/MotorcycleEntity';
import { MotorcycleNotFoundError } from '@triumph-motorcycles/domain/errors/motorcycle/MotorcycleNotFoundError';
import { MotorStatus } from '@triumph-motorcycles/domain/types/motorcycle';

export interface MotorcycleRepository {
  save(motorcycle: MotorcycleEntity): Promise<void>;
  all(): Promise<MotorcycleEntity[] | MotorcycleNotFoundError>;
  findOneById(id: string): Promise<MotorcycleEntity | MotorcycleNotFoundError>;
  delete(id: string): Promise<void>;
  update(appointment: MotorcycleEntity): Promise<void>;
  updateMileage(id: string, mileage: number): Promise<void>;
  updateStatus(id: string, newStatus: MotorStatus): Promise<void>;
  updateServiceDetails(
    id: string,
    newServiceMileage: number,
    serviceDate: Date,
  ): Promise<void>;
}
