import {
  LocationEntity,
  MaintenanceEntity,
  MotorcycleTryEntity,
  RepairEntity,
} from '@triumph-motorcycles/domain/entities';

export type AppointmentReason =
  | { type: 'Location'; entity: LocationEntity }
  | { type: 'Maintenance'; entity: MaintenanceEntity }
  | { type: 'Repair'; entity: RepairEntity }
  | { type: 'MotorcycleTry'; entity: MotorcycleTryEntity };
