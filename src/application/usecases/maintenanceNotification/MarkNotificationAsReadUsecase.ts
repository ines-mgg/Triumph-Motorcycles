import { MaintenanceNotificationRepository } from "../../repositories/MaintenanceNotificationRepository";

export class MarkNotificationAsReadUsecase {
  constructor(
    private readonly notificationRepository: MaintenanceNotificationRepository,
  ) {}

  public async execute(notificationId: string): Promise<void> {
    await this.notificationRepository.markAsRead(notificationId);
  }
}
