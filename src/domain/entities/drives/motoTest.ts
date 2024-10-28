import { Motorcycle } from './motorcycle';
import { Driver } from './driver';

export class MotoTest {
  constructor(
    public testId: string,
    public motorcycle: Motorcycle,
    public driver: Driver,
    public startDate: Date,
    public endDate: Date | null = null,
  ) {}

  // Calculate the duration of the test in days, returns null if test is ongoing
  getTestDuration(): number | null {
    if (this.endDate) {
      const duration = Math.floor(
        (this.endDate.getTime() - this.startDate.getTime()) /
          (1000 * 60 * 60 * 24),
      );
      return duration;
    }
    return null;
  }

  // End the test and set the end date
  endTest(endDate: Date): void {
    if (endDate >= this.startDate) {
      this.endDate = endDate;
    }
  }

  // Check if the test is currently active
  isTestOngoing(): boolean {
    return this.endDate === null;
  }

  // Retrieve summary information about the test
  getTestSummary(): string {
    const duration = this.getTestDuration();
    const status = this.isTestOngoing()
      ? 'Ongoing'
      : `Completed in ${duration} days`;
    return `Moto Test ID: ${this.testId} | Driver: ${this.driver.name} | Motorcycle: ${this.motorcycle.model} | Status: ${status}`;
  }
}
