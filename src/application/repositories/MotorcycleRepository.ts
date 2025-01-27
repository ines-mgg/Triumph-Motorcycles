import { MotorcycleEntity } from '@triumph-motorcycles/domain/entities';
import { MotorcycleNotFoundError } from '@triumph-motorcycles/domain/errors';

export interface MotorcycleRepository {
  save(motorcycle: MotorcycleEntity): Promise<void>;
  all(): Promise<MotorcycleEntity[] | MotorcycleNotFoundError>;
  findOneById(id: string): Promise<MotorcycleEntity | MotorcycleNotFoundError>;
  delete(id: string): Promise<void>;
  update(appointment: MotorcycleEntity): Promise<void>;
}
