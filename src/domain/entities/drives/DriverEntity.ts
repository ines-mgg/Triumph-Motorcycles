import { DriverEmailError } from '@triumph-motorcycles/domain/errors/drivers';
import { DriverPhoneError } from '@triumph-motorcycles/domain/errors/drivers';
import { ExperienceError } from '@triumph-motorcycles/domain/errors/drivers';
import { v4 as uuidv4 } from 'uuid';
import { CompanyEntity } from '../company/CompanyEntity';
import { DrivingRecord } from '@triumph-motorcycles/domain/types/motorcycle';
import { LicenseType } from '@triumph-motorcycles/domain/types/motorcycle';
import { DriverEmail } from '@triumph-motorcycles/domain/values/driver/DriverEmail';
import { DriverLicense } from '@triumph-motorcycles/domain/values/driver/DriverLicense';
import { DriverName } from '@triumph-motorcycles/domain/values/driver/DriverName';
import { DriverPhone } from '@triumph-motorcycles/domain/values/driver/DriverPhone';
import { DriverYearsOfExperience } from '@triumph-motorcycles/domain/values/driver/DriverYearsOfExperience';

export class DriverEntity {
  private constructor(
    public readonly driverId: string,
    public name: DriverName,
    public license: DriverLicense,
    public licenseType: LicenseType,
    public yearsOfExperience: DriverYearsOfExperience,
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

    const name = DriverName.from(nameValue);
    if (name instanceof Error) return name;

    const license = DriverLicense.from(licenseValue);
    if (license instanceof Error) return license;

    const yearsOfExperience = DriverYearsOfExperience.from(
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
    const updatedExperience =
      DriverYearsOfExperience.from(newYearsOfExperience);
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
