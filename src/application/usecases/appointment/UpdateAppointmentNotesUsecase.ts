import { AppointmentRepository } from '@triumph-motorcycles/application/repositories';
import { AppointmentEntity } from '@triumph-motorcycles/domain/entities';
import { UnexpectedError } from '@triumph-motorcycles/domain/errors';

export class UpdateAppointmentNotesUsecase {
  public constructor(
    private readonly appointmentRepository: AppointmentRepository,
  ) {}

  public async execute(
    appointmentId: string,
    newNotes: string | null,
  ): Promise<AppointmentEntity | Error> {
    try {
      const appointment =
        await this.appointmentRepository.findById(appointmentId);
      if (appointment instanceof Error) return appointment;

      const updateResult = appointment.updateNotes(newNotes);
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
