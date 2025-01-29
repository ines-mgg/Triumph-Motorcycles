import { v4 as uuidv4 } from 'uuid';
import { MotorcycleEntity } from '../drives/MotorcycleEntity';
import { DriverEntity } from '../drives/DriverEntity';
import { Name } from '@triumph-motorcycles/domain/values/company/Name';
import { UserEntity } from '../user/UserEntity';

export class CompanyEntity {
  private motorcycles: MotorcycleEntity[] = [];
  private drivers: DriverEntity[] = [];

  private constructor(
    public readonly identifier: string,
    public name: Name,
    public user: UserEntity,
    public createdAt: Date,
    public updatedAt: Date,
  ) {}

  public static create(name: string, user: UserEntity): CompanyEntity | Error {
    const companyName = Name.from(name);
    if (companyName instanceof Error) return companyName;

    const identifier = uuidv4();
    const createdAt = new Date();
    const updatedAt = new Date();

    return new CompanyEntity(
      identifier,
      companyName,
      user,
      createdAt,
      updatedAt,
    );
  }

  public addDriver(driver: DriverEntity): void {
    if (!this.drivers.find((d) => d.driverId === driver.driverId)) {
      this.drivers.push(driver);
      driver.assignToCompany(this);
    }
  }

  public removeDriver(driverId: string): void {
    this.drivers = this.drivers.filter(
      (driver) => driver.driverId !== driverId,
    );
    const driver = this.drivers.find((d) => d.driverId === driverId);
    if (driver) {
      driver.removeFromCompany();
    }
  }

  public getDrivers(): DriverEntity[] {
    return this.drivers;
  }

  public updateName(newName: string): void | Error {
    const newCompanyName = Name.from(newName);
    if (newCompanyName instanceof Error) return newCompanyName;

    this.name = newCompanyName;
    this.updatedAt = new Date();
  }

  public addMotorcycle(motorcycle: MotorcycleEntity): void {
    if (!this.motorcycles.find((m) => m.id === motorcycle.id)) {
      this.motorcycles.push(motorcycle);
    }
  }

  public removeMotorcycle(motorcycleId: string): void {
    this.motorcycles = this.motorcycles.filter(
      (motorcycle) => motorcycle.id !== motorcycleId,
    );
  }

  public getMotorcycles(): MotorcycleEntity[] {
    return this.motorcycles;
  }

  public getDetails(): {
    identifier: string;
    name: string;
    user: UserEntity;
    motorcycles: MotorcycleEntity[];
  } {
    return {
      identifier: this.identifier,
      name: this.name.value,
      user: this.user,
      motorcycles: this.motorcycles,
    };
  }
}
