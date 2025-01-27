import { UserRepository } from '@triumph-motorcycles/application/repositories';
import { SignUpResponse } from '@triumph-motorcycles/application/responses';
import { AuthenticationService } from '@triumph-motorcycles/application/services';
import { UserEntity } from '@triumph-motorcycles/domain/entities';
import {
  UnexpectedError,
  UserAlreadyExistsError,
} from '@triumph-motorcycles/domain/errors';
import { Password, Username } from '@triumph-motorcycles/domain/values';

export class SignUpUsecase {
  public constructor(
    private readonly userRepository: UserRepository,
    private readonly authenticationService: AuthenticationService,
  ) {}

  public async execute(
    username: string,
    password: string,
  ): Promise<SignUpResponse | Error> {
    try {
      const existingUser = await this.userRepository.findByUsername(username);
      if (existingUser) return new UserAlreadyExistsError();

      const usernameEntity = Username.from(username);
      if (usernameEntity instanceof Error) return usernameEntity;

      const passwordEntity = Password.from(password);
      if (passwordEntity instanceof Error) return passwordEntity;

      const newUser = UserEntity.create(
        username,
        password,
        new Date(),
        new Date(),
      );

      if (newUser instanceof Error) return newUser;

      const authenticationToken =
        await this.authenticationService.createAuthenticationToken(
          newUser.identifier,
        );

      await this.userRepository.save(newUser);

      const response: SignUpResponse = {
        username: newUser.username.value,
        administrator: newUser.administrator,
        authenticationToken,
      };

      return response;
    } catch (error) {
      return new UnexpectedError(
        error instanceof Error ? error.message : String(error),
      );
    }
  }
}
