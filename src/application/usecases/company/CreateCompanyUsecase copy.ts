import { CompanyRepository } from '@triumph-motorcycles/application/repositories/CompanyRepository';
import { UserRepository } from '@triumph-motorcycles/application/repositories/UserRepository';
import { CompanyEntity } from '@triumph-motorcycles/domain/entities/company/CompanyEntity';
import { UnexpectedError } from '@triumph-motorcycles/domain/errors/user/UnexpectedError';

export class CreateCompanyUsecase {
  public constructor(
    private readonly companyRepository: CompanyRepository,
    private readonly userRepository: UserRepository,
  ) {}

  public async execute(name: string, userId: string): Promise<void | Error> {
    try {
      const user = await this.userRepository.findById(userId);
      if (user instanceof Error) return user;

      const company = CompanyEntity.create(
        null,
        name,
        user,
        new Date(),
        new Date(),
      );
      if (company instanceof Error) return company;

      await this.companyRepository.save(company);
    } catch (error) {
      return new UnexpectedError(
        error instanceof Error ? error.message : String(error),
      );
    }
  }
}
