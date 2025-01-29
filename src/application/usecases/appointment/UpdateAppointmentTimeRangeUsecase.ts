import { AppointmentRepository } from '@triumph-motorcycles/application/repositories/AppointmentRepository';
import { AppointmentEntity } from '@triumph-motorcycles/domain/entities/appointment/AppointmentEntity';
import { UnexpectedError } from '@triumph-motorcycles/domain/errors/user/UnexpectedError';

export class UpdateAppointmentTimeRangeUsecase {
  public constructor(
    private readonly appointmentRepository: AppointmentRepository,
  ) {}

  public async execute(
    appointmentId: string,
    startTime: Date,
    endTime: Date,
  ): Promise<AppointmentEntity | Error> {
    try {
      const appointment =
        await this.appointmentRepository.findById(appointmentId);
      if (appointment instanceof Error) return appointment;

      const updateResult = appointment.updateTimeRange(startTime, endTime);

      if (updateResult instanceof Error) return updateResult;

      await this.appointmentRepository.save(appointment);
      return appointment;
    } catch (error) {
      return new UnexpectedError(
        error instanceof Error ? error.message : String(error),
      );
    }
  }
}
