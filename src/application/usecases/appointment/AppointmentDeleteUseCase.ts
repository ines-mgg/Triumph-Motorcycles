import { AppointmentRepository } from '@triumph-motorcycles/application/repositories/AppointmentRepository';

export class AppointmentDeleteUseCase {
  constructor(private readonly repository: AppointmentRepository) {}

  public async deleteAppointment(id: string): Promise<void | Error> {
    const appointment = await this.repository.findById(id);
    if (!appointment) {
      return new Error('Appointment not found');
    }
    await this.repository.delete(id);
  }
}
