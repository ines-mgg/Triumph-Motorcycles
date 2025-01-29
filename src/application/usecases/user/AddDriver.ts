import { DriverEntity } from '@triumph-motorcycles/domain/entities/drives/DriverEntity';
import { UserRepository } from '@triumph-motorcycles/application/repositories/UserRepository';
import { DriverRepository } from '@triumph-motorcycles/application/repositories/DriverRepository';

export class AddDriverToUserUsecase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly driverRepository: DriverRepository,
  ) {}

  public async execute(
    userId: string,
    driver: DriverEntity,
  ): Promise<void | Error> {
    const user = await this.userRepository.findById(userId);

    if (user instanceof Error) return user;

    await this.driverRepository.save(driver);
    user.addDriver(driver);

    await this.userRepository.update(user);
  }
}
