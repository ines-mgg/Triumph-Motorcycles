import { UserRepositoryInterface } from "@triumph-motorcycles/application/repositories/UserRepositoryInterface";
import { UserEntity } from "@triumph-motorcycles/domain/entities/user/UserEntity";


export class GetAllUsersUseCase {
  constructor(
    private readonly userRepository: UserRepositoryInterface, 
  ) {}

  async execute(): Promise<UserEntity[] | Error> {
    return this.userRepository.findAll();
  }
}
