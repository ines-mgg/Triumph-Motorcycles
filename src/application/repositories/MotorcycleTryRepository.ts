import { MotorcycleTryEntity } from "@triumph-motorcycles/domain/entities/drives";

export interface MotorcycleTryRepository {
  save(motorcycleTry: MotorcycleTryEntity): Promise<void>;
  findOneById(id: string): Promise<MotorcycleTryEntity | null>;
  delete(id: string): Promise<void>;
  all(): Promise<MotorcycleTryEntity[]>;
}
