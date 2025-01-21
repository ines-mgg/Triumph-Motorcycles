import { DriverEntity } from "@triumph-motorcycles/domain/entities/drives";
import { DriverRepository } from "src/application/repositories/DriverRepository";
import { UserRepository } from "src/application/repositories/UserRepository";

export class AddDriverToUserUsecase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly driverRepository: DriverRepository
  ) {}

  public async execute(userId: string, driver: DriverEntity): Promise<void | Error> {
    const user = await this.userRepository.findById(userId);

    if(user instanceof Error) return user

    await this.driverRepository.save(driver);
    user.addDriver(driver);

    await this.userRepository.update(user);
  }
}
