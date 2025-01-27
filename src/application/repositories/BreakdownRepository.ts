import { BreakdownEntity } from '@triumph-motorcycles/domain/entities';
import { BreakdownNotFoundError } from '@triumph-motorcycles/domain/errors';

export interface BreakdownRepository {
  save(breakdown: BreakdownEntity): Promise<void>;
  findOneById(id: string): Promise<BreakdownEntity | BreakdownNotFoundError>;
  findByMotorcycleId(
    motorcycleId: string,
  ): Promise<BreakdownEntity[] | BreakdownNotFoundError>;
  delete(id: string): Promise<void>;
  all(): Promise<BreakdownEntity[]>;
}
