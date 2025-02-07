import { CompanyRepository } from "@triumph-motorcycles/application/repositories/CompanyRepository";
import { ConcessionRepository } from "@triumph-motorcycles/application/repositories/ConcessionRepository";
import { UserRepository } from "@triumph-motorcycles/application/repositories/UserRepository";
import { ConcessionEntity } from "@triumph-motorcycles/domain/entities/concession/ConcessionEntity";
import { UnexpectedError } from "@triumph-motorcycles/domain/errors/user/UnexpectedError";


export class CreateConcessionUsecase {
  public constructor(
    private readonly concessionRepository: ConcessionRepository,
    private readonly companyRepository: CompanyRepository,
    private readonly userRepository: UserRepository
  ) {}

  public async execute(
    name: string,
    userId: string,
    companyId: string,
  ): Promise<void | Error> {
    try {
      const user = await this.userRepository.findById(userId);
      if (user instanceof Error) return user 

      const company = await this.companyRepository.findById(companyId);
      if (company instanceof Error) return company
       
      const newConcession = ConcessionEntity.create(null, name, user, company, null, null);
      if (newConcession instanceof Error) return newConcession;
    
      await this.concessionRepository.save(newConcession);

    } catch (error) {
      return new UnexpectedError(error instanceof Error ? error.message : String(error));
    }
  }
}
