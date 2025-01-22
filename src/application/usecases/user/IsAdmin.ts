import { UserRepository } from "src/application/repositories/UserRepository";

export class CheckUserIsAdminUsecase {
  constructor(private readonly userRepository: UserRepository) {}

  public async execute(userId: string): Promise<boolean | Error> {
    const user = await this.userRepository.findById(userId);

    if(user instanceof Error) return user

    return user.isAdmin();
  }
}
