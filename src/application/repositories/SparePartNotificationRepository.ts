import { SparePartNotificationEntity } from "@triumph-motorcycles/domain/entities/parts";
import { SparePartNotificationNotFoundError } from "src/domain/errors/sparePart/SparePartNotificationNotFoundError";

export interface SparePartNotificationRepository {
  save(notification: SparePartNotificationEntity): Promise<void>;
  findAll(): Promise<SparePartNotificationEntity[] | SparePartNotificationNotFoundError>;
}
