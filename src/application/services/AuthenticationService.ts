import { UnauthorizedError } from '@triumph-motorcycles/domain/errors/user/UnauthorizedError';

export interface AuthenticationService {
  readonly createAuthenticationToken: (
    userIdentifier: string,
  ) => Promise<string>;
  readonly verifyAuthenticationToken: (
    authenticationToken: string,
  ) => Promise<string | UnauthorizedError>;
}
