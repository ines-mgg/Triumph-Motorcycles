import { UserRepository } from '@triumph-motorcycles/application/repositories/UserRepository';

export class UpdateUsernameUsecase {
  constructor(private readonly userRepository: UserRepository) {}

  public async execute(
    userId: string,
    newUsername: string,
  ): Promise<void | Error> {
    const user = await this.userRepository.findById(userId);

    if (user instanceof Error) return user;

    const result = user.updateUsername(newUsername);

    if (result instanceof Error) return result;

    await this.userRepository.update(user);
  }
}
