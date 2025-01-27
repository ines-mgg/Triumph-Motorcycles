import {
  DriverEmailError,
  DriverPhoneError,
  ExperienceError,
} from '@triumph-motorcycles/domain/errors';

import { v4 as uuidv4 } from 'uuid';
import { CompanyEntity } from '../company/CompanyEntity';
import {
  DriveLicense,
  DriveName,
  DriverEmail,
  DriverPhone,
  DriveYearsOfExperience,
} from '@triumph-motorcycles/domain/values';
import { DrivingRecord, LicenseType } from '@triumph-motorcycles/domain/types';

export class DriverEntity {
  private constructor(
    public readonly driverId: string,
    public name: DriveName,
    public license: DriveLicense,
    public licenseType: LicenseType,
    public yearsOfExperience: DriveYearsOfExperience,
    public email: DriverEmail,
    public phone: DriverPhone,
    private readonly drivingHistory: DrivingRecord[] = [],
    public company: CompanyEntity | null = null,
  ) {}

  public static create(
    nameValue: string,
    licenseType: LicenseType,
    licenseValue: string,
    yearsOfExperienceValue: number,
    emailValue: string,
    phoneValue: string,
    company: CompanyEntity | null = null,
  ): DriverEntity | Error {
    const driverId = uuidv4();

    const name = DriveName.from(nameValue);
    if (name instanceof Error) return name;

    const license = DriveLicense.from(licenseValue);
    if (license instanceof Error) return license;

    const yearsOfExperience = DriveYearsOfExperience.from(
      yearsOfExperienceValue,
    );
    if (yearsOfExperience instanceof Error) return yearsOfExperience;

    const email = DriverEmail.from(emailValue);
    if (email instanceof DriverEmailError) return email;

    const phone = DriverPhone.from(phoneValue);
    if (phone instanceof DriverPhoneError) return phone;

    return new DriverEntity(
      driverId,
      name,
      license,
      licenseType,
      yearsOfExperience,
      email,
      phone,
      [],
      company,
    );
  }

  public assignToCompany(company: CompanyEntity): void {
    this.company = company;
  }

  public removeFromCompany(): void {
    this.company = null;
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

  public addDrivingRecord(record: DrivingRecord): void {
    this.drivingHistory.push(record);
  }

  public getDrivingHistory(): DrivingRecord[] {
    return this.drivingHistory;
  }

  public updateExperience(newYearsOfExperience: number): void {
    const updatedExperience = DriveYearsOfExperience.from(newYearsOfExperience);
    if (updatedExperience instanceof Error) {
      throw updatedExperience;
    }
    if (updatedExperience.value < this.yearsOfExperience.value) {
      throw new ExperienceError();
    }
    this.yearsOfExperience = updatedExperience;
  }

  public updateContactInfo(newContactInfo: {
    email: string;
    phone: string;
  }): void {
    const updatedEmail = DriverEmail.from(newContactInfo.email);
    if (updatedEmail instanceof DriverEmailError) {
      throw updatedEmail;
    }

    const updatedPhone = DriverPhone.from(newContactInfo.phone);
    if (updatedPhone instanceof DriverPhoneError) {
      throw updatedPhone;
    }

    this.email = updatedEmail;
    this.phone = updatedPhone;
  }

  public hasIncidentHistory(): boolean {
    return this.drivingHistory.some((record) => record.type === 'Incident');
  }
}
