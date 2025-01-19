import { CommonRepairAction } from '../../types/motorcycle';
import { RepairDate } from '../../values/repair/RepairDate'; 
import { RepairCost } from '../../values/repair/RepairCost';
import { BreakdownEntity } from './BreakdownEntity';

export class RepairEntity {
  [x: string]: any;
  private constructor(
    public readonly id: string,
    public readonly breakdown: BreakdownEntity,
    public readonly repairDate: RepairDate,
    public readonly actions: CommonRepairAction[],
    public readonly cost: RepairCost,
  ) {}

  public static create(
    id: string,
    breakdown: BreakdownEntity,
    repairDateValue: Date,
    actions: CommonRepairAction[],
    costValue: number,
  ): RepairEntity | Error {
    if (!actions || actions.length === 0) {
      return new Error('Repair actions must be provided.');
    }

    const repairDate = RepairDate.from(repairDateValue);
    if (repairDate instanceof Error) {
      return repairDate;
    }

    const cost = RepairCost.from(costValue);
    if (cost instanceof Error) {
      return cost;
    }

    return new RepairEntity(id, breakdown, repairDate, actions, cost);
  }

}
