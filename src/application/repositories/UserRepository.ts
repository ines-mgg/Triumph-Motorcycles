import { UserEntity } from '@triumph-motorcycles/domain/entities';
import { UserNotFoundError } from '@triumph-motorcycles/domain/errors';

export interface UserRepository {
  findById(identifier: string): Promise<UserEntity | UserNotFoundError>;
  findByUsername(username: string): Promise<UserEntity | UserNotFoundError>;
  save(user: UserEntity): Promise<void | Error>;
  update(user: UserEntity): Promise<void | Error>;
  delete(identifier: string): Promise<void | Error>;
}
