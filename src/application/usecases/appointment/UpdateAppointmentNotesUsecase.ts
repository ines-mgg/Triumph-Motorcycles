import { AppointmentRepository } from "src/application/repositories/AppointmentRepository";
import { AppointmentEntity } from "src/domain/entities/appointment/AppointmentEntity";
import { UnexpectedError } from "src/domain/errors/user/UnexpectedError";

export class UpdateAppointmentNotesUsecase {
  public constructor(
    private readonly appointmentRepository: AppointmentRepository
  ) {}

  public async execute(
    appointmentId: string,
    newNotes: string | null
  ): Promise<AppointmentEntity | Error> {
    try {
      const appointment = await this.appointmentRepository.findById(appointmentId);
      if (appointment instanceof Error) return appointment;

      const updateResult = appointment.updateNotes(newNotes);
      if (updateResult instanceof Error) return updateResult;

      await this.appointmentRepository.save(appointment);
      return appointment;
    } catch (error) {
      return new UnexpectedError(error instanceof Error ? error.message : String(error));
    }
  }
}
