export class Repair {
  constructor(
    public id: string,
    public breakdownId: string,
    public repairDate: Date,
    public actions: string,
    public cost: number,
  ) {}
}
