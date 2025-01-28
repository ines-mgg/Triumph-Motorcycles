import { PasswordService } from '../PasswordService';
import { UnauthorizedError } from '@triumph-motorcycles/domain/errors/user/UnauthorizedError';

describe('PasswordService', () => {
  let passwordService: PasswordService;

  beforeEach(() => {
    passwordService = {
      hashPassword: jest.fn(),
      verifyPassword: jest.fn(),
    };
  });

  it('should hash a plain password', async () => {
    const plainPassword = 'plainPassword123';
    const hashedPassword = 'hashedPassword123';
    (passwordService.hashPassword as jest.Mock).mockResolvedValue(
      hashedPassword,
    );

    const result = await passwordService.hashPassword(plainPassword);
    expect(passwordService.hashPassword).toHaveBeenCalledWith(plainPassword);
    expect(result).toBe(hashedPassword);
  });

  it('should verify a password successfully', async () => {
    const plainPassword = 'plainPassword123';
    const hashedPassword = 'hashedPassword123';
    (passwordService.verifyPassword as jest.Mock).mockResolvedValue(true);

    const result = await passwordService.verifyPassword(
      plainPassword,
      hashedPassword,
    );
    expect(passwordService.verifyPassword).toHaveBeenCalledWith(
      plainPassword,
      hashedPassword,
    );
    expect(result).toBe(true);
  });

  it('should return an error if password verification fails', async () => {
    const plainPassword = 'plainPassword123';
    const hashedPassword = 'wrongHashedPassword';
    (passwordService.verifyPassword as jest.Mock).mockResolvedValue(
      new UnauthorizedError(),
    );

    const result = await passwordService.verifyPassword(
      plainPassword,
      hashedPassword,
    );
    expect(passwordService.verifyPassword).toHaveBeenCalledWith(
      plainPassword,
      hashedPassword,
    );
    expect(result).toBeInstanceOf(UnauthorizedError);
  });
});
