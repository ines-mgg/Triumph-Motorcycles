import { AppointmentRepository } from "@triumph-motorcycles/application/repositories/AppointmentRepository";
import { AppointmentReason } from "@triumph-motorcycles/domain/types/AppointmentReason";
import { AppointmentStatus } from "@triumph-motorcycles/domain/types/AppointmentStatus";


export class AppointmentUpdateUseCase {
    constructor(private readonly repository: AppointmentRepository) {}
  
    public async updateAppointmentUsecase(
      id: string,
      appointmentStatus: AppointmentStatus,
      reason: AppointmentReason,
    ): Promise<void | Error> {

      await this.repository.updateStatus(id, appointmentStatus, reason);
    }
  }