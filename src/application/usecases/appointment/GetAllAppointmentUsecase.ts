import { AppointmentRepositoryInterface } from '@triumph-motorcycles/application/repositories/AppointmentRepositoryInterface';
import { AppointmentEntity } from '@triumph-motorcycles/domain/entities/appointment/AppointmentEntity';

export class GetAllAppointmentsUsecase {
  constructor(private readonly appointmentRepository: AppointmentRepositoryInterface) {}

  public async execute(): Promise<AppointmentEntity[] | Error> {
    return await this.appointmentRepository.findAll();
  }
}
