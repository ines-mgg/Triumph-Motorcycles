import { MotorcycleEntity } from "@triumph-motorcycles/domain/entities/drives";

export interface MotorcycleRepository {
  save(motorcycle: MotorcycleEntity): Promise<void>;
  all(): Promise<MotorcycleEntity[]>;
  findOneById(id: string): Promise<MotorcycleEntity | null>;
  delete(id: string): Promise<void>;
}
