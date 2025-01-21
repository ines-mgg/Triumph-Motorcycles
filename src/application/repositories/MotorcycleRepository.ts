import { MotorcycleEntity } from "@triumph-motorcycles/domain/entities/drives";
import { MotorcycleNotFoundError } from "src/domain/errors/motorcycle/MotorcycleNotFoundError";

export interface MotorcycleRepository {
  save(motorcycle: MotorcycleEntity): Promise<void>;
  all(): Promise<MotorcycleEntity[] | MotorcycleNotFoundError>;
  findOneById(id: string): Promise<MotorcycleEntity | MotorcycleNotFoundError>;
  delete(id: string): Promise<void>;
}
