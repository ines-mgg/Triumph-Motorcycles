import { SparePartEntity } from '@triumph-motorcycles/domain/entities/parts/SparePartEntity';
import { SparePartNotFoundError } from '@triumph-motorcycles/domain/errors/sparePart/SparePartNotFoundError';

export interface SparePartRepository {
  save(sparePart: SparePartEntity): Promise<void>;
  findById(id: string): Promise<SparePartEntity | SparePartNotFoundError>;
  findAll(): Promise<SparePartEntity[] | SparePartNotFoundError>;
  remove(id: string): Promise<void>;
  restock(id: string, quantity: number): Promise<void>;
  reserve(id: string, quantity: number): Promise<void>;
  use(id: string, quantityInStock, totalUsage, reservedStock): Promise<void>;
}
