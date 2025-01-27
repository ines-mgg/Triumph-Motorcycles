import { MotorcycleTryEntity } from '@triumph-motorcycles/domain/entities';
import { MotorcycleTryNotFoundError } from '@triumph-motorcycles/domain/errors';

export interface MotorcycleTryRepository {
  save(motorcycleTry: MotorcycleTryEntity): Promise<void>;
  findOneById(
    id: string,
  ): Promise<MotorcycleTryEntity | MotorcycleTryNotFoundError>;
  delete(id: string): Promise<void>;
  all(): Promise<MotorcycleTryEntity[] | MotorcycleTryNotFoundError>;
}
