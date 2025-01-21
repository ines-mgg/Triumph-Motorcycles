import { SparePartHistoryEntity } from "@triumph-motorcycles/domain/entities/parts";
import { SparePartHistoryRecordNotFoundError } from "src/domain/errors/sparePart/SparePartHistoryRecordNotFoundError";

export interface SparePartHistoryRecordRepository {
  save(orderRecord: SparePartHistoryEntity): Promise<void>;
  findByOrderId(orderId: string): Promise<SparePartHistoryEntity | SparePartHistoryRecordNotFoundError>;
  findAll(): Promise<SparePartHistoryEntity[] | SparePartHistoryRecordNotFoundError>;
}
