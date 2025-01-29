import { UserRepository } from '@triumph-motorcycles/application/repositories/UserRepository';

export class GetUserRoleUsecase {
  constructor(private readonly userRepository: UserRepository) {}

  public async execute(userId: string): Promise<string | Error> {
    const user = await this.userRepository.findById(userId);

    if (user instanceof Error) return user;

    return user.getRole();
  }
}
