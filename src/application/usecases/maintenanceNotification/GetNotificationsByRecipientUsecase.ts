import { MaintenanceNotificationEntity } from '@triumph-motorcycles/domain/entities';
import { MaintenanceNotificationRepository } from '@triumph-motorcycles/application/repositories';

export class GetNotificationsByRecipientUsecase {
  constructor(
    private readonly notificationRepository: MaintenanceNotificationRepository,
  ) {}

  public async execute(
    recipientId: string,
  ): Promise<MaintenanceNotificationEntity[] | Error> {
    return await this.notificationRepository.findByRecipientId(recipientId);
  }
}
