import { UserRepository } from '@triumph-motorcycles/application/repositories/UserRepository';
import { SignUpResponse } from '@triumph-motorcycles/application/responses/SignUpResponse';
import { AuthenticationService } from '@triumph-motorcycles/application/services/AuthenticationService';
import { UserEntity } from '@triumph-motorcycles/domain/entities/user/UserEntity';
import { UserAlreadyExistsError } from '@triumph-motorcycles/domain/errors/user/UserAlreadyExistsError';
import { UnexpectedError } from '@triumph-motorcycles/domain/errors/user/UnexpectedError';
import { Password } from '@triumph-motorcycles/domain/values/user/Password';
import { Username } from '@triumph-motorcycles/domain/values/user/Username';

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
