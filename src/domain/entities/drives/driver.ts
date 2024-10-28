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
  ) {}

  addDrivingRecord(record: DrivingRecord): void {
    this.drivingHistory.push(record);
  }


  getDrivingHistory(): DrivingRecord[] {
    return this.drivingHistory;
  }

  updateExperience(newYearsOfExperience: number): void {
    if (newYearsOfExperience > this.yearsOfExperience) {
      this.yearsOfExperience = newYearsOfExperience;
    }
  }

  updateContactInfo(newContactInfo: { email: string; phone: string }): void {
    this.contactInfo = newContactInfo;
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
