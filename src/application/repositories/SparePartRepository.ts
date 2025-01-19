import { SparePartEntity } from "@triumph-motorcycles/domain/entities/parts";

export interface SparePartRepository {
  save(sparePart: SparePartEntity): Promise<void>;
  findById(id: string): Promise<SparePartEntity | null>;
  findAll(): Promise<SparePartEntity[]>;
}
