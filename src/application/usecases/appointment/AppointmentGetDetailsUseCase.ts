import { AppointmentRepository } from "@triumph-motorcycles/application/repositories/AppointmentRepository";

export class AppointmentGetDetailsUseCase {
  constructor(private readonly appointmentRepository: AppointmentRepository) {}

  async execute(appointmentId: string): Promise<object | Error> {
    const appointment = await this.appointmentRepository.findById(appointmentId);

    if (appointment instanceof Error) return appointment;

    return appointment.getDetails();
  }
}
