import { InvalidRepairActionError } from "../../errors/maintenances";

export class Repair {
  public static readonly commonActions: string[] = [
    "Oil Change",
    "Brake Replacement",
    "Tire Replacement",
    "Chain Adjustment",
    "Clutch Adjustment",
    "Battery Replacement",
    "Spark Plug Replacement",
    "Fuel System Cleaning",
    "Fork Seals Replacement",
    "Transmission Fluid Change",
    "Suspension Adjustment",
    "Electrical System Diagnostics",
    "Coolant Change",
    "Headlight Replacement",
    "Exhaust Repair",
    "Bodywork Repair",
    "Engine Repair",
    "Clutch Repair", 
  ];

  constructor(
    public id: string,
    public breakdownId: string,
    public repairDate: Date,
    public actions: string,
    public cost: number,
  ) {
    this.validateActions(actions);
  }

  private validateActions(actions: string): void {
    const actionList = actions.split(',').map(action => action.trim());
    for (const action of actionList) {
      if (!Repair.commonActions.includes(action)) {
        throw new InvalidRepairActionError(action);
      }
    }
  }
}