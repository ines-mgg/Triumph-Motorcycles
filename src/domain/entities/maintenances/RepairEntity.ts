import { RepairCost } from '@triumph-motorcycles/domain/values/repair/RepairCost';
import { RepairDate } from '@triumph-motorcycles/domain/values/repair/RepairDate';
import { CommonRepairAction } from '../../types/motorcycle';
import { BreakdownEntity } from './BreakdownEntity';
import { v4 as uuidv4 } from 'uuid';

export class RepairEntity {
  private constructor(
    public readonly id: string,
    public readonly breakdown: BreakdownEntity,
    public readonly repairDate: RepairDate,
    public readonly actions: CommonRepairAction[],
    public readonly cost: RepairCost,
  ) {}

  public static create(
    breakdown: BreakdownEntity,
    repairDateValue: Date,
    actions: CommonRepairAction[],
    costValue: number,
  ): RepairEntity | Error {
    const id = uuidv4();

    const repairDate = RepairDate.from(repairDateValue);
    if (repairDate instanceof Error) return repairDate;

    const cost = RepairCost.from(costValue);
    if (cost instanceof Error) return cost;

    return new RepairEntity(id, breakdown, repairDate, actions, cost);
  }
}
