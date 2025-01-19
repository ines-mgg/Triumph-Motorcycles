import { RepairEntity } from "@triumph-motorcycles/domain/entities/maintenances";

export interface BreakdownRepairHistoryRepository {
  saveRepair(repair: RepairEntity): Promise<void>;
  getAllRepairs(): Promise<RepairEntity[]>;
  getRepairsByBreakdown(breakdownId: string): Promise<RepairEntity[]>;
}
