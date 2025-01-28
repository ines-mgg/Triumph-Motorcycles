import { DriverEntity } from '@triumph-motorcycles/domain/entities/drives/DriverEntity';
import { UserRepository } from '@triumph-motorcycles/application/repositories/UserRepository';
import { DriverRepository } from '@triumph-motorcycles/application/repositories/DriverRepository';

export class GetDriversForUserUsecase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly driverRepository: DriverRepository,
  ) {}

  public async execute(userId: string): Promise<DriverEntity[] | Error> {
    const user = await this.userRepository.findById(userId);

    if (user instanceof Error) return user;

    return await this.driverRepository.findAllByUser(userId);
  }
}
