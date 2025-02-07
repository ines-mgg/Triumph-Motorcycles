import { CancelLocationError } from "@triumph-motorcycles/domain/errors/location/CancelLocationError";
import { EndDateError } from "@triumph-motorcycles/domain/errors/location/EndDateError";
import { EndLocationError } from "@triumph-motorcycles/domain/errors/location/EndLocationError";
import { LocationStatus } from "@triumph-motorcycles/domain/types/LocationStatus";
import { EndDate } from "@triumph-motorcycles/domain/values/location/EndDate";
import { StartDate } from "@triumph-motorcycles/domain/values/location/StartDate";
import { MotorcycleEntity } from "../motorcycle/MotorcycleEntity";
import { UserEntity } from "../user/UserEntity";


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
    id: string,
    motorcycle: MotorcycleEntity,
    user: UserEntity,
    startDate: Date,
    endDate: Date,
    status: LocationStatus,
    cost: number
  ): LocationEntity | Error {
    
    const startDateValue = StartDate.from(startDate);
    if ( startDateValue instanceof Error) return startDateValue;

    const endDateValue = EndDate.from(endDate, startDate);
    if (endDateValue instanceof Error) return endDateValue;

    return new LocationEntity(id, motorcycle, user, startDateValue, endDateValue, status, cost);
  }

  public endLocation(): void | Error {
    if (this.status === 'completed' || this.status === 'canceled') return new EndLocationError();
    
    const endDate = new Date();
    
    const endDateValue = EndDate.from(this.startDate.value, endDate);
    if (endDateValue instanceof Error) return endDateValue;

    this.endDate = endDateValue;
    this.status = 'completed';
  }

  public cancelLocation(): void | Error {
    if (this.status === 'completed' || this.status === 'canceled') return new CancelLocationError();
    
    this.status = 'canceled';
    this.endDate = null;
  }

  public calculateCost(): number | Error {
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
