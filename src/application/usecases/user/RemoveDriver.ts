import { UserRepository } from '@triumph-motorcycles/application/repositories/UserRepository';
import { DriverRepository } from '@triumph-motorcycles/application/repositories/DriverRepository';

export class RemoveDriverFromUserUsecase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly driverRepository: DriverRepository,
  ) {}

  public async execute(
    userId: string,
    driverId: string,
  ): Promise<void | Error> {
    const user = await this.userRepository.findById(userId);

    if (user instanceof Error) return user;

    await this.driverRepository.delete(driverId);
    user.removeDriver(driverId);

    await this.userRepository.update(user);
  }
}
