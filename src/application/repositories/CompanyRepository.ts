import { CompanyNotFoundError } from "src/domain/errors/company/CompanyNotFoundError";
import { CompanyEntity } from "../../domain/entities/company/CompanyEntity";

export interface CompanyRepository {
  save(company: CompanyEntity): Promise<void>;
  update(company: CompanyEntity): Promise<void>;
  findById(identifier: string): Promise<CompanyEntity | CompanyNotFoundError>;
  findByName(name: string): Promise<CompanyEntity | CompanyNotFoundError>;
}
