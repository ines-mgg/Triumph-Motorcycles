import { MileageError, ServiceDetailsError } from '../../errors/drivers';
export class Motorcycle {
    constructor(
        public id: string,
        public model: string,
        public mileage: number,
        public status: 'Available' | 'InMaintenance' | 'OnTest' | 'Sold',
        public purchaseDate: Date,
        public lastServiceDate: Date | null,
        public nextServiceMileage: number,
        public managerId: string,
    ) {}

    updateMileage(newMileage: number): void {
        if (newMileage < this.mileage) {
            throw new MileageError("New mileage cannot be less than current mileage.");
        }
        this.mileage = newMileage;
    }

    needsService(): boolean {
        return this.mileage >= this.nextServiceMileage;
    }

    updateServiceDetails(newServiceMileage: number, serviceDate: Date): void {
        if (newServiceMileage < this.mileage) {
            throw new ServiceDetailsError("Service mileage cannot be less than current mileage.");
        }
        this.nextServiceMileage = newServiceMileage;
        this.lastServiceDate = serviceDate;
    }
}
