import { DriverEntity } from '@triumph-motorcycles/domain/entities';
import {
  DriverRepository,
  UserRepository,
} from '@triumph-motorcycles/application/repositories';

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
