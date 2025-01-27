import { BreakdownEntity } from '@triumph-motorcycles/domain/entities';
import { RepairHistory } from './RepairHistoryUsecases';

export class GetBreakdownsByMotorcycleUsecase {
  constructor(private readonly repairHistory: RepairHistory) {}

  public execute(motorcycleId: string): BreakdownEntity[] {
    return this.repairHistory.getBreakdownsByMotorcycle(motorcycleId);
  }
}
