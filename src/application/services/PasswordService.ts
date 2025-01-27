import { UnauthorizedError } from '@triumph-motorcycles/domain/errors';

export interface PasswordService {
  hashPassword: (plainPassword: string) => Promise<string>;
  verifyPassword: (
    plainPassword: string,
    hashedPassword: string,
  ) => Promise<boolean | UnauthorizedError>;
}
