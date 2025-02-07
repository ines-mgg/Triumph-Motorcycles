import { CompanyNotFoundError } from '@triumph-motorcycles/domain/errors/company/CompanyNotFoundError';
import { CompanyEntity } from '@triumph-motorcycles/domain/entities/company/CompanyEntity';
import { ConcessionEntity } from '@triumph-motorcycles/domain/entities/concession/ConcessionEntity';
import { ConcessionNotFoundError } from '@triumph-motorcycles/domain/errors/concession/ConcessionNotFoundError';
import { DriverNotFoundError } from '@triumph-motorcycles/domain/errors/driver/DriverNotFoundError';
import { MotorcycleNotFoundError } from '@triumph-motorcycles/domain/errors/motorcycle/MotorcycleNotFoundError';

export interface CompanyRepository {
  save(company: CompanyEntity): Promise<void>;
  update(company: CompanyEntity): Promise<void>;
  findById(identifier: string): Promise<CompanyEntity | CompanyNotFoundError>;
  findByName(name: string): Promise<CompanyEntity | CompanyNotFoundError>;
  addConcessionToCompany(
    companyId: string,
    concession: ConcessionEntity,
  ): Promise<void | ConcessionNotFoundError>;
  removeConcessionFromCompany(
    companyId: string,
    concessionId: string,
  ): Promise<void | ConcessionNotFoundError>;
  findAll(): Promise<CompanyEntity[] | CompanyNotFoundError>;
  addConcession(
    companyId: string,
    concessionId: string,
  ): Promise<void | ConcessionNotFoundError>;
  removeConcession(
    companyId: string,
    concessionId: string,
  ): Promise<void | ConcessionNotFoundError>;
  addDriver(
    companyId: string,
    driverId: string,
  ): Promise<void | DriverNotFoundError>;
  removeDriver(
    companyId: string,
    driverId: string,
  ): Promise<void | DriverNotFoundError>;
  addMotorcycle(
    companyId: string,
    motorcycleId: string,
  ): Promise<void | MotorcycleNotFoundError>;
  removeMotorcycle(
    companyId: string,
    motorcycleId: string,
  ): Promise<void | MotorcycleNotFoundError>;
}
