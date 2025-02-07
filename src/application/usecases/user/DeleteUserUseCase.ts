import { UserRepositoryInterface } from "@triumph-motorcycles/application/repositories/UserRepositoryInterface";


export class DeleteUserUseCase {
  constructor(
    private readonly userRepository: UserRepositoryInterface, 
  ) {}

  async execute(id: string): Promise<void> {
    return this.userRepository.remove(id); 
  }
}
