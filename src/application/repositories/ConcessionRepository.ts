import { ConcessionEntity } from '@triumph-motorcycles/domain/entities/concession/ConcessionEntity';
import { ConcessionNotFoundError } from '@triumph-motorcycles/domain/errors/concession/ConcessionNotFoundError';
import { MotorcycleNotFoundError } from '@triumph-motorcycles/domain/errors/motorcycle/MotorcycleNotFoundError';
import { CompanyNotFoundError } from '@triumph-motorcycles/domain/errors/company/CompanyNotFoundError';

export interface ConcessionRepository {
  save(concession: ConcessionEntity): Promise<void>;
  findById(
    identifier: string,
  ): Promise<ConcessionEntity | ConcessionNotFoundError>;
  findAll(): Promise<ConcessionEntity[] | ConcessionNotFoundError>;
  update(concession: ConcessionEntity): Promise<void>;
  remove(identifier: string): Promise<void>;
  addMotorcycle(
    concessionId: string,
    motorcycleId: string,
  ): Promise<void | MotorcycleNotFoundError>;
  removeMotorcycle(
    concessionId: string,
    motorcycleId: string,
  ): Promise<void | MotorcycleNotFoundError>;
  addCompany(
    concessionId: string,
    companyId: string,
  ): Promise<void | CompanyNotFoundError>;
}
