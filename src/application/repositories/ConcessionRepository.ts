import { ConcessionEntity } from '@triumph-motorcycles/domain/entities';
import { ConcessionNotFoundError } from '@triumph-motorcycles/domain/errors';

export interface ConcessionRepository {
  save(concession: ConcessionEntity): Promise<void>;
  findById(
    identifier: string,
  ): Promise<ConcessionEntity | ConcessionNotFoundError>;
  findAll(): Promise<ConcessionEntity[] | ConcessionNotFoundError>;
  update(concession: ConcessionEntity): Promise<void>;
  remove(identifier: string): Promise<void>;
}
