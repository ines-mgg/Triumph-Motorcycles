import { AppointmentRepository } from '@triumph-motorcycles/application/repositories';
import { AppointmentEntity } from '@triumph-motorcycles/domain/entities';
import { UnexpectedError } from '@triumph-motorcycles/domain/errors';
import { AppointmentStatus } from '@triumph-motorcycles/domain/types';

export class UpdateAppointmentStatusUsecase {
  public constructor(
    private readonly appointmentRepository: AppointmentRepository,
  ) {}

  public async execute(
    appointmentId: string,
    newStatus: AppointmentStatus,
  ): Promise<AppointmentEntity | Error> {
    try {
      const appointment =
        await this.appointmentRepository.findById(appointmentId);
      if (appointment instanceof Error) return appointment;

      appointment.updateStatus(newStatus);

      await this.appointmentRepository.save(appointment);
      return appointment;
    } catch (error) {
      return new UnexpectedError(
        error instanceof Error ? error.message : String(error),
      );
    }
  }
}
