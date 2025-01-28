import { SparePartNotificationRepository } from '@triumph-motorcycles/application/repositories/SparePartNotificationRepository';
import { SparePartNotificationEntity } from '@triumph-motorcycles/domain/entities/parts/SparePartNotificationEntity';

export class GetAllSparePartNotificationsUsecase {
  constructor(
    private readonly sparePartNotificationRepository: SparePartNotificationRepository,
  ) {}

  public async execute(): Promise<SparePartNotificationEntity[] | Error> {
    return await this.sparePartNotificationRepository.findAll();
  }
}
