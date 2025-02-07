import { DriverRepositoryInterface } from "@triumph-motorcycles/application/repositories/DriverRepositoryInterface";
import { UserRepositoryInterface } from "@triumph-motorcycles/application/repositories/UserRepositoryInterface";
import { DriverEntity } from "@triumph-motorcycles/domain/entities/driver/DriverEntity";


export class GetDriversForUserUsecase {
  constructor(
    private readonly userRepository: UserRepositoryInterface,
    private readonly driverRepository: DriverRepositoryInterface
  ) {}

  public async execute(userId: string): Promise<DriverEntity[] | Error> {
    const user = await this.userRepository.findOne(userId);

    if(user instanceof Error) return user

    return await this.driverRepository.findAllByUser(userId);
  }
}
