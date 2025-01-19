import { RepairEntity } from "@triumph-motorcycles/domain/entities/maintenances";

export interface RepairRepository {
  save(repair: RepairEntity): Promise<void>;
  findById(id: string): Promise<RepairEntity | null>;
  findByBreakdownId(breakdownId: string): Promise<RepairEntity[]>;
  findByRepairDateRange(startDate: Date, endDate: Date): Promise<RepairEntity[]>;
}
