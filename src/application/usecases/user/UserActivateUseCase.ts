import { UserRepositoryInterface } from "@triumph-motorcycles/application/repositories/UserRepositoryInterface";
import { UserEntity } from "@triumph-motorcycles/domain/entities/user/UserEntity";


export class UserActivateUseCase {
  constructor(
    private readonly userRepository: UserRepositoryInterface
  ) {}

  async execute(userId: string): Promise<UserEntity | Error> {
    const user = await this.userRepository.findOne(userId);

    if (user instanceof Error) return user

    user.activate();

    await this.userRepository.update(user);

    return user;
  }
}
