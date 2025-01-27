import { SparePartNotificationEntity } from '@triumph-motorcycles/domain/entities';
import { SparePartNotificationNotFoundError } from '@triumph-motorcycles/domain/errors';

export interface SparePartNotificationRepository {
  save(notification: SparePartNotificationEntity): Promise<void>;
  findAll(): Promise<
    SparePartNotificationEntity[] | SparePartNotificationNotFoundError
  >;
}
