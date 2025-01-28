import { SparePartEntity } from '@triumph-motorcycles/domain/entities/parts/SparePartEntity';
import { SparePartNotFoundError } from '@triumph-motorcycles/domain/errors/sparePart/SparePartNotFoundError';

export interface SparePartRepository {
  save(sparePart: SparePartEntity): Promise<void>;
  findById(id: string): Promise<SparePartEntity | SparePartNotFoundError>;
  findAll(): Promise<SparePartEntity[] | SparePartNotFoundError>;
}
