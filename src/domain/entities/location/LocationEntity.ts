import { CancelLocationError } from '@triumph-motorcycles/domain/errors/location/CancelLocationError';
import { EndDateError } from '@triumph-motorcycles/domain/errors/location/EndDateError';
import { EndLocationError } from '@triumph-motorcycles/domain/errors/location/EndLocationError';
import { EndDate } from '@triumph-motorcycles/domain/values/motorcycleTry/MotorcycleTryEndDate';
import { StartDate } from '@triumph-motorcycles/domain/values/motorcycleTry/MotorcycleTryStartDate';
import { MotorcycleEntity } from '../drives/MotorcycleEntity';
import { UserEntity } from '../user/UserEntity';
import { LocationStatus } from '@triumph-motorcycles/domain/types/LocationStatus';
import { v4 as uuidv4 } from 'uuid';

export class LocationEntity {
  private constructor(
    public id: string,
    public motorcycle: MotorcycleEntity,
    public user: UserEntity,
    public startDate: StartDate,
    public endDate: EndDate | null,
    public status: LocationStatus,
    public cost: number,
  ) {}

  public static create(
    motorcycle: MotorcycleEntity,
    user: UserEntity,
    startDate: Date,
    cost: number,
  ): LocationEntity | Error {
    const id = uuidv4();

    const start = StartDate.from(startDate);
    if (start instanceof Error) return start;

    const endDate = null;
    const status: LocationStatus = 'in-progress';

    return new LocationEntity(
      id,
      motorcycle,
      user,
      start,
      endDate,
      status,
      cost,
    );
  }

  public endLocation(endDate: Date): void | Error {
    if (this.status === 'completed' || this.status === 'canceled')
      return new EndLocationError();

    const end = EndDate.from(endDate, this.startDate.value);
    if (end instanceof Error) return end;

    this.endDate = end;
    this.status = 'completed';
  }

  public cancelLocation(): void | Error {
    if (this.status === 'completed' || this.status === 'canceled')
      return new CancelLocationError();

    this.status = 'canceled';
    this.endDate = null;
  }

  public calculateCost(): void | Error {
    if (!this.endDate) return new EndDateError();

    const durationInMilliseconds =
      this.endDate.value.getTime() - this.startDate.value.getTime();
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
