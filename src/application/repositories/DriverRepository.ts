import { DriverEntity } from "@triumph-motorcycles/domain/entities/drives";
import { DriverNotFoundError } from "src/domain/errors/driver/DriverNotFoundError";

export interface DriverRepository {
  save(driver: DriverEntity): Promise<void>;
  findOneById(driverId: string): Promise<DriverEntity | DriverNotFoundError>;
  delete(driverId: string): Promise<void>;
  all(): Promise<DriverEntity[]>;
}
