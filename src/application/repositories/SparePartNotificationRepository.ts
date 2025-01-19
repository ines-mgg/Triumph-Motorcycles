import { SparePartNotificationEntity } from "@triumph-motorcycles/domain/entities/parts";

export interface SparePartNotificationRepository {
  save(notification: SparePartNotificationEntity): Promise<void>;
  findAll(): Promise<SparePartNotificationEntity[]>;
}
