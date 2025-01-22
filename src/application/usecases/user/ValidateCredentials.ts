import { UserRepository } from "../../repositories/UserRepository";

export class ValidateUserCredentialsUsecase {
  constructor(private readonly userRepository: UserRepository) {}

  public async execute(username: string, password: string): Promise<boolean | Error> {
    const user = await this.userRepository.findByUsername(username);

    if(user instanceof Error) return user

    return user.validateCredentials(username, password);
  }
}
