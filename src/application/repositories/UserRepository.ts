import { UserEntity } from "src/domain/entities/UserEntity";
import { UserNotFoundError } from "src/domain/errors/user/UserNotFoundError";

export interface UserRepository {
    findById(identifier: string): Promise<UserEntity | UserNotFoundError>;
    findByUsername(username: string): Promise<UserEntity | UserNotFoundError>;
    save(user: UserEntity): Promise<void | Error>;
    update(user: UserEntity): Promise<void | Error>;
    delete(identifier: string): Promise<void | Error>;
}