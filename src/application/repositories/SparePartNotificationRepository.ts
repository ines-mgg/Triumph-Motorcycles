import { SparePartNotificationEntity } from '@triumph-motorcycles/domain/entities/parts/SparePartNotificationEntity';
import { SparePartNotificationNotFoundError } from '@triumph-motorcycles/domain/errors/sparePart/SparePartNotificationNotFoundError';

export interface SparePartNotificationRepository {
  save(notification: SparePartNotificationEntity): Promise<void>;
  findAll(): Promise<
    SparePartNotificationEntity[] | SparePartNotificationNotFoundError
  >;
}
