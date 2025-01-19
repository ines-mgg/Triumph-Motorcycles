import { MaintenanceNotificationEntity } from "@triumph-motorcycles/domain/entities/maintenances";
import { MaintenanceNotificationRepository } from "../../repositories/MaintenanceNotificationRepository";

export class GetNotificationsByRecipientUsecase {
  constructor(
    private readonly notificationRepository: MaintenanceNotificationRepository,
  ) {}

  public async execute(recipientId: string): Promise<MaintenanceNotificationEntity[]> {
    return await this.notificationRepository.findByRecipientId(recipientId);
  }
}
