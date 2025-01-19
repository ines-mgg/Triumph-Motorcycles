import { MotorStatus } from "src/domain/types/motorcycle";
import { MotorcycleEntity } from "../MotorcycleEntity";
import { MotorcycleMileageError } from "../../../errors/motorcycle/MotorcycleMileageError";
import { MotorcycleUpdateServiceDetailsError } from '../../../errors/motorcycle/MotorcycleUpdateServiceDetailsError'


describe('MotorcycleEntity', () => {
  let motorcycle: MotorcycleEntity;

  beforeEach(() => {
    const brand = 'Yamaha';
    const model = 'MT-09';
    const year = 2023;
    const purchaseDate = new Date('2023-01-01');
    const status: MotorStatus = 'Available';

    motorcycle = MotorcycleEntity.create(brand, model, year, purchaseDate, status) as MotorcycleEntity;
  });

  it('should create a motorcycle entity successfully with valid inputs', () => {
    expect(motorcycle).toBeInstanceOf(MotorcycleEntity);
    expect(motorcycle.brand.value).toBe('Yamaha');
    expect(motorcycle.model.value).toBe('MT-09');
    expect(motorcycle.year.value).toBe(2023);
    expect(motorcycle.mileage).toBe(0);
    expect(motorcycle.status).toBe('Available');
    expect(motorcycle.purchaseDate).toEqual(new Date('2023-01-01'));
  });

  it('should throw an error if mileage is updated to a lower value', () => {
    expect(() => motorcycle.updateMileage(-500)).toThrow(MotorcycleMileageError);
  });

  it('should update mileage correctly', () => {
    motorcycle.updateMileage(5000);
    expect(motorcycle.mileage).toBe(5000);
  });

  it('should correctly determine if service is needed', () => {
    motorcycle.updateMileage(5000);
    expect(motorcycle.needsService()).toBe(true); 
  });

  it('should throw an error when updating service details with lower mileage than current', () => {
    motorcycle.updateMileage(5000);
    expect(() => motorcycle.updateServiceDetails(4000, new Date())).toThrow(MotorcycleUpdateServiceDetailsError);
  });

  it('should update service details correctly', () => {
    motorcycle.updateMileage(5000);
    motorcycle.updateServiceDetails(10000, new Date('2025-01-01'));
    expect(motorcycle.nextServiceMileage).toBe(10000);
    expect(motorcycle.lastServiceDate).toEqual(new Date('2025-01-01'));
  });

  it('should update the status of the motorcycle', () => {
    motorcycle.updateStatus('InMaintenance');
    expect(motorcycle.status).toBe('InMaintenance');
  });
});
