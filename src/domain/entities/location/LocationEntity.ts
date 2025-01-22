import { StartDate } from "../../values/location/StartDate";
import { MotorcycleEntity } from "../drives";
import { UserEntity } from "../user/UserEntity";
import { EndDate } from "../../values/location/EndDate";
import { LocationStatus } from "../../types/LocationStatus";
import crypto from 'crypto';
import { EndLocationError } from "../../errors/location/EndLocationError";
import { CancelLocationError } from "../../errors/location/cancelLocationError";
import { EndDateError } from "../../errors/location/EndDateError";

export class LocationEntity {

  private constructor(
    public id: string,
    public motorcycle: MotorcycleEntity,
    public user: UserEntity,
    public startDate: StartDate,
    public endDate: EndDate | null,
    public status: LocationStatus,
    public cost: number,
  ) {
   
  }

  public static create(
    motorcycle: MotorcycleEntity,
    user: UserEntity,
    startDate: Date,
    cost: number
  ): LocationEntity | Error {
    const id = crypto.randomUUID();
    
    const start = StartDate.from(startDate);
    if (start instanceof Error) return start;

    const endDate = null;
    const status: LocationStatus = 'in-progress';

    return new LocationEntity(id, motorcycle, user, start, endDate, status, cost);
  }

  public endLocation(endDate: Date): void | Error {
    if (this.status === 'completed' || this.status === 'canceled') return new EndLocationError();
    
    const end = EndDate.from(endDate, this.startDate);
    if (end instanceof Error) return end;

    this.endDate = end;
    this.status = 'completed';
  }

  public cancelLocation(): void | Error {
    if (this.status === 'completed' || this.status === 'canceled') return new CancelLocationError();
    
    this.status = 'canceled';
    this.endDate = null;
  }

  public calculateCost(): void | Error {
    if (!this.endDate) return new EndDateError();
  
    const durationInMilliseconds = this.endDate.value.getTime() - this.startDate.value.getTime();
    const durationInHours = durationInMilliseconds / (1000 * 3600);
    this.cost = Math.round(durationInHours * 10); 
  }

  public getDetails(): object {
    return {
      id: this.id, 
      motorcycle: this.motorcycle,
      user: this.user,
      startDate: this.startDate.value,
      endDate: this.endDate ? this.endDate.value : null,
      status: this.status,
      cost: this.cost,
    };
  }
}
