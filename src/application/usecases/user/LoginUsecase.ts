import { UserRepository } from "src/application/repositories/UserRepository";
import { LoginResponse } from "src/application/responses/LoginResponse";
import { AuthenticationService } from "src/application/services/AuthenticationService";
import { UnauthorizedError } from "src/domain/errors/user/UnauthorizedError";
import { UnexpectedError } from "src/domain/errors/user/UnexpectedError";

export class LoginUsecase {
  public constructor(
    private readonly authenticationService: AuthenticationService,
    private readonly userRepository: UserRepository,
  ) {}

  public async execute(
    username: string,
    password: string
  ): Promise<LoginResponse | Error> {
    try {
      const user = await this.userRepository.findByUsername(username);

      if (user instanceof Error) return user;

      const credentialsValid = user.validateCredentials(username, password);

      if (!credentialsValid) return new UnauthorizedError(); 

      const authenticationToken = await this.authenticationService.createAuthenticationToken(user.identifier);

      const response: LoginResponse = {
        authenticationToken,
        administrator: user.administrator,
      };

      return response;
    } catch (error) {
      return new UnexpectedError(error instanceof Error ? error.message : String(error));
    }
  }
}
