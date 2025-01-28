import { UserRepository } from '@triumph-motorcycles/application/repositories/UserRepository';
import { LoginResponse } from '@triumph-motorcycles/application/responses/LoginResponse';
import { AuthenticationService } from '@triumph-motorcycles/application/services/AuthenticationService';
import { UnexpectedError } from '@triumph-motorcycles/domain/errors/user/UnexpectedError';
import { UnauthorizedError } from '@triumph-motorcycles/domain/errors/user/UnauthorizedError';

export class LoginUsecase {
  public constructor(
    private readonly authenticationService: AuthenticationService,
    private readonly userRepository: UserRepository,
  ) {}

  public async execute(
    username: string,
    password: string,
  ): Promise<LoginResponse | Error> {
    try {
      const user = await this.userRepository.findByUsername(username);

      if (user instanceof Error) return user;

      const credentialsValid = user.validateCredentials(username, password);

      if (!credentialsValid) return new UnauthorizedError();

      const authenticationToken =
        await this.authenticationService.createAuthenticationToken(
          user.identifier,
        );

      const response: LoginResponse = {
        authenticationToken,
        administrator: user.administrator,
      };

      return response;
    } catch (error) {
      return new UnexpectedError(
        error instanceof Error ? error.message : String(error),
      );
    }
  }
}
