import { BreakdownEntity } from "@triumph-motorcycles/domain/entities/maintenances";

export interface BreakdownRepository {
  save(breakdown: BreakdownEntity): Promise<void>;
  findOneById(id: string): Promise<BreakdownEntity | null>;
  findByMotorcycleId(motorcycleId: string): Promise<BreakdownEntity[]>;
  delete(id: string): Promise<void>;
  all(): Promise<BreakdownEntity[]>;
}
