import { SparePartEntity } from "@triumph-motorcycles/domain/entities";
import { SparePartNotFoundError } from "@triumph-motorcycles/domain/errors";

export interface SparePartRepository {
  save(sparePart: SparePartEntity): Promise<void>;
  findById(id: string): Promise<SparePartEntity | SparePartNotFoundError>;
  findAll(): Promise<SparePartEntity[] | SparePartNotFoundError>;
}
