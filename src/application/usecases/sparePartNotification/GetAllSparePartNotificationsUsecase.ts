import { SparePartNotificationEntity } from "@triumph-motorcycles/domain/entities/parts";
import { SparePartNotificationRepository } from "../../repositories/SparePartNotificationRepository";

export class GetAllSparePartNotificationsUsecase {
  constructor(
    private readonly sparePartNotificationRepository: SparePartNotificationRepository,
  ) {}

  public async execute(): Promise<SparePartNotificationEntity[]> {
    return await this.sparePartNotificationRepository.findAll();
  }
}
