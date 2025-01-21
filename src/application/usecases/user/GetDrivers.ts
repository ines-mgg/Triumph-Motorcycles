import { DriverEntity } from "@triumph-motorcycles/domain/entities/drives";
import { DriverRepository } from "src/application/repositories/DriverRepository";
import { UserRepository } from "src/application/repositories/UserRepository";

export class GetDriversForUserUsecase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly driverRepository: DriverRepository
  ) {}

  public async execute(userId: string): Promise<DriverEntity[] | Error> {
    const user = await this.userRepository.findById(userId);

    if(user instanceof Error) return user

    return await this.driverRepository.findAllByUser(userId);
  }
}
