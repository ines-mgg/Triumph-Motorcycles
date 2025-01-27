import { RepairEntity } from '@triumph-motorcycles/domain/entities';

export interface BreakdownRepairHistoryRepository {
  saveRepair(repair: typeof RepairEntity): Promise<void>;
  getAllRepairs(): Promise<(typeof RepairEntity)[]>;
  getRepairsByBreakdown(breakdownId: string): Promise<(typeof RepairEntity)[]>;
}
