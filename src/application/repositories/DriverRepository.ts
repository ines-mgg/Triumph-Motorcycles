import { DriverEntity } from "@triumph-motorcycles/domain/entities/drives";

export interface DriverRepository {
  save(driver: DriverEntity): Promise<void>;
  findOneById(driverId: string): Promise<DriverEntity | null>;
  delete(driverId: string): Promise<void>;
  all(): Promise<DriverEntity[]>;
}
