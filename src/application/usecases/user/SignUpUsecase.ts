import { UnexpectedError } from "src/domain/errors/user/UnexpectedError";
import { UserEntity } from "src/domain/entities/UserEntity"; 
import { Username } from "src/domain/values/user/Username";
import { Password } from "src/domain/values/user/Password";
import { UserRepository } from "src/application/repositories/UserRepository";
import { SignUpResponse } from "src/application/responses/SignUpResponse";
import { UserAlreadyExistsError } from "src/domain/errors/user/UserAlreadyExistsError";
import { AuthenticationService } from "src/application/services/AuthenticationService";

export class SignUpUsecase {
  public constructor(
    private readonly userRepository: UserRepository,
    private readonly authenticationService: AuthenticationService 
  ) {}

  public async execute(
    username: string,
    password: string
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

      const authenticationToken = await this.authenticationService.createAuthenticationToken(newUser.identifier);

      await this.userRepository.save(newUser);

      const response: SignUpResponse = {
        username: newUser.username.value,
        administrator: newUser.administrator,
        authenticationToken, 
      };

      return response;
    } catch (error) {
      return new UnexpectedError(error instanceof Error ? error.message : String(error));
    }
  }
}
