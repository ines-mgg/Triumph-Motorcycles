import { Motorcycle } from './motorcycle';
import { Driver } from './driver';
import {
    TestEndDateError,
    MissingMotorcycleError,
    MissingDriverError,
    InvalidTestIDError,
} from '../../errors/drivers'; 

export class MotoTest {
    constructor(
        public testId: string,
        public motorcycle: Motorcycle,
        public driver: Driver,
        public startDate: Date,
        public endDate: Date | null = null,
    ) {
        if (!this.testId) {
            throw new InvalidTestIDError("Test ID cannot be empty.");
        }
        if (!motorcycle) {
            throw new MissingMotorcycleError("Motorcycle cannot be null or undefined.");
        }
        if (!driver) {
            throw new MissingDriverError("Driver cannot be null or undefined.");
        }
    }

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

    endTest(endDate: Date): void {
        if (endDate < this.startDate) {
            throw new TestEndDateError("End date cannot be earlier than start date.");
        }
        this.endDate = endDate;
    }

    isTestOngoing(): boolean {
        return this.endDate === null;
    }

    getTestSummary(): string {
        const duration = this.getTestDuration();
        const status = this.isTestOngoing()
            ? 'Ongoing'
            : `Completed in ${duration} days`;
        return `Moto Test ID: ${this.testId} | Driver: ${this.driver.name} | Motorcycle: ${this.motorcycle.model} | Status: ${status}`;
    }
}
