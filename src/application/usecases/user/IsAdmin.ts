import { UserRepository } from '@triumph-motorcycles/application/repositories';

export class CheckUserIsAdminUsecase {
  constructor(private readonly userRepository: UserRepository) {}

  public async execute(userId: string): Promise<boolean | Error> {
    const user = await this.userRepository.findById(userId);

    if (user instanceof Error) return user;

    return user.isAdmin();
  }
}
