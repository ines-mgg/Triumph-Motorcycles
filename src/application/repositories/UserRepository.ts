import { UserEntity } from '@triumph-motorcycles/domain/entities/user/UserEntity';
import { UserNotFoundError } from '@triumph-motorcycles/domain/errors/user/UserNotFoundError';

export interface UserRepository {
  findById(identifier: string): Promise<UserEntity | UserNotFoundError>;
  findByUsername(username: string): Promise<UserEntity | UserNotFoundError>;
  save(user: UserEntity): Promise<void | UserNotFoundError>;
  update(user: UserEntity): Promise<void | UserNotFoundError>;
  delete(identifier: string): Promise<void | UserNotFoundError>;
}
