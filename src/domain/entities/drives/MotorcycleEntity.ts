import { MotorcycleUpdateServiceDetailsError } from "../../errors/motorcycle/MotorcycleUpdateServiceDetailsError";
import { MotorStatus } from "../../types/motorcycle";
import { MotorcycleBrand } from "../../values/motorcycle/MotorcycleBrand";
import { MotorcycleModel } from "../../values/motorcycle/MotorcycleModel";
import { MotorcycleYear } from "../../values/motorcycle/MotorcycleYear";
import { BaseEntity } from "../BaseEntity";
import { CompanyEntity } from "../company/CompanyEntity";
import { ConcessionEntity } from "../concession/ConcessionEntity";
import crypto from "crypto";
import { MotorcycleMileageError } from "../../errors/motorcycle/MotorcycleMileageError";

export class MotorcycleEntity {
  private constructor(
    public readonly id: string,
    private readonly base: BaseEntity,
    public brand: MotorcycleBrand,
    public model: MotorcycleModel,
    public year: MotorcycleYear,
    private _mileage: number,
    public status: MotorStatus,
    private readonly _purchaseDate: Date,
    private _lastServiceDate: Date | null,
    private _nextServiceMileage: number,
    private company: CompanyEntity | null = null,
    private concession: ConcessionEntity | null = null
  ) {}

  public static create(
    brandValue: string,
    modelValue: string,
    yearValue: number,
    purchaseDate: Date,
    status: MotorStatus
  ): MotorcycleEntity | Error {
    const brand = MotorcycleBrand.from(brandValue);
    if (brand instanceof Error) return brand;

    const model = MotorcycleModel.from(modelValue);
    if (model instanceof Error) return model;

    const year = MotorcycleYear.from(yearValue);
    if (year instanceof Error) return year;

    const initialMileage = 0;
    const lastServiceDate = null;
    const nextServiceMileage = 5000;

    const id = crypto.randomUUID();

    return new MotorcycleEntity(
      id,
      new BaseEntity(),
      brand,
      model,
      year,
      initialMileage,
      status,
      purchaseDate,
      lastServiceDate,
      nextServiceMileage
    );
  }

  public updateMileage(newMileage: number): void {
    if (newMileage < this._mileage) {
      throw new MotorcycleMileageError();
    }
    this._mileage = newMileage;
    this.base.updatedAt = new Date();
  }

  public needsService(): boolean {
    return this._mileage >= this._nextServiceMileage;
  }

  public updateServiceDetails(newServiceMileage: number, serviceDate: Date): void {
    if (newServiceMileage < this._mileage) {
      throw new MotorcycleUpdateServiceDetailsError();
    }
    this._nextServiceMileage = newServiceMileage;
    this._lastServiceDate = serviceDate;
    this.base.updatedAt = new Date();
  }

  public updateStatus(newStatus: MotorStatus): void {
    this.status = newStatus;
    this.base.updatedAt = new Date();
  }

  public assignToCompany(company: CompanyEntity): void {
    this.company = company;
    this.base.updatedAt = new Date();
  }

  public removeFromCompany(): void {
    this.company = null;
    this.base.updatedAt = new Date();
  }

  public getCompanyDetails(): object | null {
    if (!this.company) {
      return null;
    }
    return {
      identifier: this.company.identifier,
      name: this.company.name.value,
      user: this.company.user,
    };
  }

  public assignToConcession(concession: ConcessionEntity): void {
    this.concession = concession;
    this.base.updatedAt = new Date();
  }

  public removeFromConcession(): void {
    this.concession = null;
    this.base.updatedAt = new Date();
  }

  public getConcessionDetails(): object | null {
    if (!this.concession) {
      return null;
    }
    return {
      identifier: this.concession.identifier,
      name: this.concession.name.value,
      user: this.concession.user,
    };
  }

  public get mileage(): number {
    return this._mileage;
  }

  public get purchaseDate(): Date {
    return this._purchaseDate;
  }

  public get lastServiceDate(): Date | null {
    return this._lastServiceDate;
  }

  public get nextServiceMileage(): number {
    return this._nextServiceMileage;
  }
}
