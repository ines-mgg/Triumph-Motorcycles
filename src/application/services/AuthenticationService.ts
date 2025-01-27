import { UnauthorizedError } from '@triumph-motorcycles/domain/errors';

export interface AuthenticationService {
  readonly createAuthenticationToken: (
    userIdentifier: string,
  ) => Promise<string>;
  readonly verifyAuthenticationToken: (
    authenticationToken: string,
  ) => Promise<string | UnauthorizedError>;
}
