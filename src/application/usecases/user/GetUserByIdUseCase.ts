import { UserRepositoryInterface } from "@triumph-motorcycles/application/repositories/UserRepositoryInterface";
import { UserEntity } from "@triumph-motorcycles/domain/entities/user/UserEntity";


export class GetUserByIdUseCase {
  constructor(
    private readonly userRepository: UserRepositoryInterface, 
  ) {}

  async execute(id: string): Promise<UserEntity | Error> {
    return this.userRepository.findOne(id); 
  }
}
