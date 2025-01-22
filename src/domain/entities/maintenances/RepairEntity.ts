import { CommonRepairAction } from '../../types/motorcycle';
import { RepairDate } from '../../values/repair/RepairDate'; 
import { RepairCost } from '../../values/repair/RepairCost';
import { BreakdownEntity } from './BreakdownEntity';
import crypto from 'crypto';

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
    
    const id = crypto.randomUUID();
   
    const repairDate = RepairDate.from(repairDateValue);
    if (repairDate instanceof Error) return repairDate;

    const cost = RepairCost.from(costValue);
    if (cost instanceof Error) return cost;

    return new RepairEntity(id, breakdown, repairDate, actions, cost);
  }

}
