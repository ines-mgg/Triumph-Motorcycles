import { MotorcycleEntity } from "../../drives";
import { MaintenanceEntity } from "../MaintenanceEntity";


describe('MaintenanceEntity', () => {
  let motorcycle: MotorcycleEntity;

  beforeEach(() => {
    motorcycle = MotorcycleEntity.create(
      'Yamaha',
      'R1',
      2021,
      new Date(),
      "Available", 
    ) as MotorcycleEntity;
  });

  it('should create a MaintenanceEntity correctly', () => {
    const maintenanceIntervalMileage = 5000;
    const maintenanceIntervalTime = 180; 

    const maintenance = MaintenanceEntity.create(
      motorcycle,
      maintenanceIntervalMileage,
      maintenanceIntervalTime
    );

    expect(maintenance).toBeInstanceOf(MaintenanceEntity);

     if (maintenance instanceof MaintenanceEntity) {
        expect(maintenance.maintenanceIntervalMileage.value).toBe(maintenanceIntervalMileage);
        expect(maintenance.maintenanceIntervalTime.value).toBe(maintenanceIntervalTime);
     }
   
  });

  it('should return an error for invalid maintenance mileage', () => {
    const invalidMileage = -5000;
    const maintenanceIntervalTime = 180;

    const maintenance = MaintenanceEntity.create(
      motorcycle,
      invalidMileage,
      maintenanceIntervalTime
    );

    expect(maintenance).toBeInstanceOf(Error);
  });

  it('should return an error for invalid maintenance time', () => {
    const maintenanceIntervalMileage = 5000;
    const invalidTime = -10;

    const maintenance = MaintenanceEntity.create(
      motorcycle,
      maintenanceIntervalMileage,
      invalidTime
    );

    expect(maintenance).toBeInstanceOf(Error);
  });

  it('should schedule the next maintenance correctly', () => {
    const maintenanceIntervalMileage = 5000; 
    const maintenanceIntervalTime = 180; 
  
    const maintenance = MaintenanceEntity.create(
      motorcycle,
      maintenanceIntervalMileage,
      maintenanceIntervalTime
    ) as MaintenanceEntity;
  
    motorcycle.updateMileage(5000);
    motorcycle.updateServiceDetails(10000, new Date()); 

    maintenance.scheduleNextMaintenance();
  
    expect(motorcycle.nextServiceMileage).toBe(15000); 
    expect(motorcycle.lastServiceDate).toBeInstanceOf(Date);
  });
  
  it('should return true if maintenance is needed by mileage', () => {
    const maintenanceIntervalMileage = 5000;
    const maintenanceIntervalTime = 180;
    
    const motorcycle = MotorcycleEntity.create(
      'Harley-Davidson',
      'Iron 883',
      2023,
      new Date(),
      'Available'
    ) as MotorcycleEntity;
  
    const maintenance = MaintenanceEntity.create(
      motorcycle,
      maintenanceIntervalMileage,
      maintenanceIntervalTime
    ) as MaintenanceEntity;
  
    motorcycle.updateMileage(10000); 
    motorcycle.updateServiceDetails(15000, new Date()); 
  
    expect(motorcycle.nextServiceMileage).toBe(15000);
  
    motorcycle.updateMileage(16000);
  
    expect(maintenance.needsMaintenance()).toBe(true);
  });  
  
  it('should return false if maintenance is not needed', () => {
    const maintenanceIntervalMileage = 5000;
    const maintenanceIntervalTime = 180;

    const maintenance = MaintenanceEntity.create(
      motorcycle,
      maintenanceIntervalMileage,
      maintenanceIntervalTime
    ) as MaintenanceEntity;

    motorcycle.updateMileage(1000);
    motorcycle.updateServiceDetails(5000, new Date());

    expect(maintenance.needsMaintenance()).toBe(false); 
  });
});
