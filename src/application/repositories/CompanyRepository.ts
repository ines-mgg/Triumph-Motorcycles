import { CompanyNotFoundError } from '@triumph-motorcycles/domain/errors';
import { CompanyEntity } from '@triumph-motorcycles/domain/entities';

export interface CompanyRepository {
  save(company: CompanyEntity): Promise<void>;
  update(company: CompanyEntity): Promise<void>;
  findById(identifier: string): Promise<CompanyEntity | CompanyNotFoundError>;
  findByName(name: string): Promise<CompanyEntity | CompanyNotFoundError>;
}
