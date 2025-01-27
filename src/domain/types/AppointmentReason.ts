
import { MaintenanceEntity, MotorcycleTryEntity, RepairEntity } from "../entities";
import { LocationEntity } from "../entities/location/LocationEntity";

export type AppointmentReason =
  | { type: "Location"; entity: LocationEntity }
  | { type: "Maintenance"; entity: MaintenanceEntity }
  | { type: "Repair"; entity: RepairEntity }
  | { type: "MotorcycleTry"; entity: MotorcycleTryEntity };
