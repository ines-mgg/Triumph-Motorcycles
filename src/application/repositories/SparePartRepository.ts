import { SparePartEntity } from "@triumph-motorcycles/domain/entities/parts";
import { SparePartNotFoundError } from "src/domain/errors/sparePart/SparePartNotFoundError";

export interface SparePartRepository {
  save(sparePart: SparePartEntity): Promise<void>;
  findById(id: string): Promise<SparePartEntity | SparePartNotFoundError>;
  findAll(): Promise<SparePartEntity[] | SparePartNotFoundError>;
}
