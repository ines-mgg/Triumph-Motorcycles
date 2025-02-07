import { AppointmentRepository } from '@triumph-motorcycles/application/repositories/AppointmentRepository';

export class AppointmentCompleteUseCase {
  constructor(private readonly appointmentRepository: AppointmentRepository) {}

  async execute(appointmentId: string): Promise<void | Error> {
    const appointment = await this.appointmentRepository.findById(
      appointmentId,
    );

    if (appointment instanceof Error) return appointment;

    const completeError = appointment.complete();

    if (completeError instanceof Error) return completeError;

    await this.appointmentRepository.complete(appointmentId);
  }
}
