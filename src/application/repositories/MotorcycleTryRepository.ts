import { MotorcycleTryEntity } from "@triumph-motorcycles/domain/entities/drives";
import { MotorcycleTryNotFoundError } from "src/domain/errors/motorcycleTry/MotorcycleTestNotFoundError";

export interface MotorcycleTryRepository {
  save(motorcycleTry: MotorcycleTryEntity): Promise<void>;
  findOneById(id: string): Promise<MotorcycleTryEntity | MotorcycleTryNotFoundError>;
  delete(id: string): Promise<void>;
  all(): Promise<MotorcycleTryEntity[] | MotorcycleTryNotFoundError>;
}
