import { MotorcycleTryEntity } from "../entities/drives";
import { LocationEntity } from "../entities/location/LocationEntity";
import { MaintenanceEntity, RepairEntity } from "../entities/maintenances";

export type AppointmentReason =
  | { type: "Location"; entity: LocationEntity }
  | { type: "Maintenance"; entity: MaintenanceEntity }
  | { type: "Repair"; entity: RepairEntity }
  | { type: "MotorcycleTry"; entity: MotorcycleTryEntity };
