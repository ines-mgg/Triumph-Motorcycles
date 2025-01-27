import { AuthenticationService } from '../AuthenticationService';
import { UnauthorizedError } from '@triumph-motorcycles/domain/errors';

describe('AuthenticationService', () => {
  let authenticationService: AuthenticationService;

  beforeEach(() => {
    authenticationService = {
      createAuthenticationToken: jest.fn(),
      verifyAuthenticationToken: jest.fn(),
    };
  });

  it('should create an authentication token', async () => {
    const userIdentifier = 'user123';
    const token = 'token123';
    (
      authenticationService.createAuthenticationToken as jest.Mock
    ).mockResolvedValue(token);

    const result =
      await authenticationService.createAuthenticationToken(userIdentifier);
    expect(
      authenticationService.createAuthenticationToken,
    ).toHaveBeenCalledWith(userIdentifier);
    expect(result).toBe(token);
  });

  it('should verify an authentication token', async () => {
    const token = 'token123';
    const userIdentifier = 'user123';
    (
      authenticationService.verifyAuthenticationToken as jest.Mock
    ).mockResolvedValue(userIdentifier);

    const result = await authenticationService.verifyAuthenticationToken(token);
    expect(
      authenticationService.verifyAuthenticationToken,
    ).toHaveBeenCalledWith(token);
    expect(result).toBe(userIdentifier);
  });

  it('should return an error if token verification fails', async () => {
    const token = 'invalidToken';
    (
      authenticationService.verifyAuthenticationToken as jest.Mock
    ).mockResolvedValue(new UnauthorizedError());

    const result = await authenticationService.verifyAuthenticationToken(token);
    expect(
      authenticationService.verifyAuthenticationToken,
    ).toHaveBeenCalledWith(token);
    expect(result).toBeInstanceOf(UnauthorizedError);
  });
});
