import { UserRepository } from '@triumph-motorcycles/application/repositories';
import { LoginResponse } from '@triumph-motorcycles/application/responses';
import { AuthenticationService } from '@triumph-motorcycles/application/services';
import {
  UnauthorizedError,
  UnexpectedError,
} from '@triumph-motorcycles/domain/errors';

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
