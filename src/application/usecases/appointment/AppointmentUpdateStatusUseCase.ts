import { AppointmentRepository } from "@triumph-motorcycles/application/repositories/AppointmentRepository";
import { AppointmentStatus } from "@triumph-motorcycles/domain/types/AppointmentStatus";


export class AppointmentUpdateStatusUseCase {
  constructor(private readonly appointmentRepository: AppointmentRepository) {}

  async execute(appointmentId: string, newStatus: AppointmentStatus): Promise<void | Error> {
    const appointment = await this.appointmentRepository.findById(appointmentId);

    if (appointment instanceof Error) return appointment

    appointment.updateStatus(newStatus);
    await this.appointmentRepository.update(appointment);
  }
}
