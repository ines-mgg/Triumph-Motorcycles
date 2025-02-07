import { BreakdownEntity } from '@triumph-motorcycles/domain/entities/maintenances/BreakdownEntity';
import { BreakdownNotFoundError } from '@triumph-motorcycles/domain/errors/breakdown/BreakdownNotFoundError';

export interface BreakdownRepository {
  save(breakdown: BreakdownEntity): Promise<void>;
  findOneById(
    breakdownId: string,
  ): Promise<BreakdownEntity | BreakdownNotFoundError>;
  findByMotorcycleId(
    motorcycleId: string,
  ): Promise<BreakdownEntity[] | BreakdownNotFoundError>;
  delete(breakdownId: string): Promise<void>;
  all(): Promise<BreakdownEntity[]>;
  updateDescription(breakdownId: string, description: string): Promise<void>;
  addRepair(
    breakdownId: string,
    repairId: string,
  ): Promise<void | BreakdownNotFoundError>;
}
