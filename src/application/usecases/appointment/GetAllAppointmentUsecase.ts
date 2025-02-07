import { AppointmentRepository } from '@triumph-motorcycles/application/repositories/AppointmentRepository';
import { AppointmentEntity } from '@triumph-motorcycles/domain/entities/appointment/AppointmentEntity';

export class GetAllAppointmentsUsecase {
  constructor(private readonly appointmentRepository: AppointmentRepository) {}

  public async execute(): Promise<AppointmentEntity[] | Error> {
    return await this.appointmentRepository.findAll();
  }
}
