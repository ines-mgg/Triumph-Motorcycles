import { SparePartNotificationRepository } from '@triumph-motorcycles/application/repositories';
import { SparePartNotificationEntity } from '@triumph-motorcycles/domain/entities';

export class GetAllSparePartNotificationsUsecase {
  constructor(
    private readonly sparePartNotificationRepository: SparePartNotificationRepository,
  ) {}

  public async execute(): Promise<SparePartNotificationEntity[] | Error> {
    return await this.sparePartNotificationRepository.findAll();
  }
}
