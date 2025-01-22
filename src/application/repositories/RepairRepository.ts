import { RepairEntity } from "@triumph-motorcycles/domain/entities/maintenances";
import { RepairNotFoundError } from "src/domain/errors/repair/RepairNotFoundError";

export interface RepairRepository {
  save(repair: RepairEntity): Promise<void>;
  findById(id: string): Promise<RepairEntity | RepairNotFoundError>;
  findByBreakdownId(breakdownId: string): Promise<RepairEntity[] | RepairNotFoundError>;
  findByRepairDateRange(startDate: Date, endDate: Date): Promise<RepairEntity[] | RepairNotFoundError>;
}
