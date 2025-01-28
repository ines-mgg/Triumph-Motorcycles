import { SparePartHistoryEntity } from '@triumph-motorcycles/domain/entities/parts/SparePartHistoryEntity';
import { SparePartHistoryRecordNotFoundError } from '@triumph-motorcycles/domain/errors/sparePart/SparePartHistoryRecordNotFoundError';

export interface SparePartHistoryRecordRepository {
  save(orderRecord: SparePartHistoryEntity): Promise<void>;
  findByOrderId(
    orderId: string,
  ): Promise<SparePartHistoryEntity | SparePartHistoryRecordNotFoundError>;
  findAll(): Promise<
    SparePartHistoryEntity[] | SparePartHistoryRecordNotFoundError
  >;
}
