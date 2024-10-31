import { 
  InvalidLicenseError, 
  ExperienceError, 
  ContactInfoError, 
  DrivingRecordError 
} from '../../errors/drivers';

export class Driver {
  constructor(
    public driverId: string,
    public name: string,
    public licenseNumber: string,
    public licenseType: 'A' | 'B' | 'C',
    public yearsOfExperience: number,
    public contactInfo: {
      email: string;
      phone: string;
    },
    private readonly drivingHistory: DrivingRecord[] = [],
  ) {
    this.validate();
  }

  private validate(): void {
    if (!this.isValidLicense(this.licenseNumber)) {
      throw new InvalidLicenseError(this.licenseNumber);
    }

    if (this.yearsOfExperience < 0) {
      throw new ExperienceError("Years of experience cannot be negative.");
    }
  }

  private isValidLicense(license: string): boolean {
    return /^[A-Z0-9]+$/.test(license); 
  }

  addDrivingRecord(record: DrivingRecord): void {
    if (!(record instanceof DrivingRecord)) {
      throw new DrivingRecordError("Invalid driving record.");
    }
    this.drivingHistory.push(record);
  }

  getDrivingHistory(): DrivingRecord[] {
    return this.drivingHistory;
  }

  updateExperience(newYearsOfExperience: number): void {
    if (newYearsOfExperience < this.yearsOfExperience) {
        throw new ExperienceError("New experience must be greater than current experience.");
    }
    this.yearsOfExperience = newYearsOfExperience;
  }

  updateContactInfo(newContactInfo: { email: string; phone: string }): void {
    if (!this.isValidEmail(newContactInfo.email)) {
      throw new ContactInfoError("Invalid email format.");
    }
    this.contactInfo = newContactInfo;
  }

  private isValidEmail(email: string): boolean {
    return /\S+@\S+\.\S+/.test(email);
  }

  hasIncidentHistory(): boolean {
    return this.drivingHistory.some((record) => record.type === 'Incident');
  }
}

export class DrivingRecord {
  constructor(
    public date: Date,
    public motorcycleId: string,
    public type: 'Test Drive' | 'Incident',
    public details: string, 
  ) {}
}
