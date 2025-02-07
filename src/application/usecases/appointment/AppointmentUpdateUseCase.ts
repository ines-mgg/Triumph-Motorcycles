import { AppointmentStatus } from "@triumph-motorcycles/domain/types/AppointmentStatus";
import { AppointmentReason } from "@triumph-motorcycles/domain/types/AppointmentReason";
import { AppointmentRepositoryInterface } from "@triumph-motorcycles/application/repositories/AppointmentRepositoryInterface";


export class AppointmentUpdateUseCase {
    constructor(private readonly repository: AppointmentRepositoryInterface) {}
  
    public async updateAppointmentUsecase(
      id: string,
      appointmentStatus: AppointmentStatus,
      reason: AppointmentReason,
    ): Promise<void | Error> {

      await this.repository.updateStatus(id, appointmentStatus, reason);
    }
  }