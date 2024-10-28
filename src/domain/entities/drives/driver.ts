export class Driver {
  constructor(
    public driverId: string,
    public name: string,
    public licenseNumber: string,
    public licenseType: 'A' | 'B' | 'C', // Assuming A, B, C types for motorcycles
    public yearsOfExperience: number,
    public contactInfo: {
      email: string;
      phone: string;
    },
    private drivingHistory: DrivingRecord[] = [],
  ) {}

  // Add a driving record to the driver's history
  addDrivingRecord(record: DrivingRecord): void {
    this.drivingHistory.push(record);
  }

  // Retrieve the full driving history
  getDrivingHistory(): DrivingRecord[] {
    return this.drivingHistory;
  }

  // Update driver experience
  updateExperience(newYearsOfExperience: number): void {
    if (newYearsOfExperience > this.yearsOfExperience) {
      this.yearsOfExperience = newYearsOfExperience;
    }
  }

  // Update driver contact information
  updateContactInfo(newContactInfo: { email: string; phone: string }): void {
    this.contactInfo = newContactInfo;
  }

  // Check if driver has any incidents in their history
  hasIncidentHistory(): boolean {
    return this.drivingHistory.some((record) => record.type === 'Incident');
  }
}

// Represents an individual driving record for a driver
export class DrivingRecord {
  constructor(
    public date: Date,
    public motorcycleId: string,
    public type: 'Test Drive' | 'Incident',
    public details: string, // E.g., description of the incident or test drive
  ) {}
}
