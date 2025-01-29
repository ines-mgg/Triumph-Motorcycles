import { UserRepository } from '@triumph-motorcycles/application/repositories/UserRepository';

export class UpdateUserPasswordUsecase {
  constructor(private readonly userRepository: UserRepository) {}

  public async execute(
    userId: string,
    newPassword: string,
  ): Promise<void | Error> {
    const user = await this.userRepository.findById(userId);

    if (user instanceof Error) return user;

    const result = user.updatePassword(newPassword);

    if (result instanceof Error) return result;

    await this.userRepository.update(user);
  }
}
