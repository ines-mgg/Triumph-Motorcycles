import { RepairEntity } from '@triumph-motorcycles/domain/entities/maintenances/RepairEntity';
import { RepairNotFoundError } from '@triumph-motorcycles/domain/errors/repair/RepairNotFoundError';
import { CommonRepairAction } from '@triumph-motorcycles/domain/types/motorcycle';

export interface RepairRepository {
  save(repair: RepairEntity): Promise<void>;
  findById(id: string): Promise<RepairEntity | RepairNotFoundError>;
  findByBreakdownId(
    breakdownId: string,
  ): Promise<RepairEntity[] | RepairNotFoundError>;
  findByRepairDateRange(
    startDate: Date,
    endDate: Date,
  ): Promise<RepairEntity[] | RepairNotFoundError>;
  deleteById(id: string): Promise<void>;
  update(repair: RepairEntity): Promise<void>;
  findAll(): Promise<RepairEntity[] | RepairNotFoundError>;
  updateActions(
    repairId: string,
    newActions: CommonRepairAction[],
  ): Promise<void | RepairNotFoundError>;
}
