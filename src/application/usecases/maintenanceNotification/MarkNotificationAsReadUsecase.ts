import { MaintenanceNotificationRepository } from '@triumph-motorcycles/application/repositories';

export class MarkNotificationAsReadUsecase {
  constructor(
    private readonly notificationRepository: MaintenanceNotificationRepository,
  ) {}

  public async execute(notificationId: string): Promise<void> {
    await this.notificationRepository.markAsRead(notificationId);
  }
}
