import { LocationEntity } from '@triumph-motorcycles/domain/entities/location/LocationEntity.ts';
import { MotorcycleTryEntity } from '@triumph-motorcycles/domain/entities/drives/MotorcycleTryEntity';
import { MaintenanceEntity } from '@triumph-motorcycles/domain/entities/maintenances/MaintenanceEntity';
import { RepairEntity } from '@triumph-motorcycles/domain/entities/maintenances/RepairEntity';

export type AppointmentReason =
  | { type: 'Location'; entity: LocationEntity }
  | { type: 'Maintenance'; entity: MaintenanceEntity }
  | { type: 'Repair'; entity: RepairEntity }
  | { type: 'MotorcycleTry'; entity: MotorcycleTryEntity };
