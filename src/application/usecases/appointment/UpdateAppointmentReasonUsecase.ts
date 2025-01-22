import { AppointmentRepository } from "src/application/repositories/AppointmentRepository";
import { AppointmentEntity } from "src/domain/entities/appointment/AppointmentEntity";
import { UnexpectedError } from "src/domain/errors/user/UnexpectedError";
import { AppointmentReason } from "src/domain/types/AppointmentReason";

export class UpdateAppointmentReasonUsecase {
  public constructor(
    private readonly appointmentRepository: AppointmentRepository
  ) {}

  public async execute(
    appointmentId: string,
    newReason: AppointmentReason
  ): Promise<AppointmentEntity | Error> {
    try {
      const appointment = await this.appointmentRepository.findById(appointmentId);

      if (appointment instanceof Error) return appointment;

      appointment.updateReason(newReason);

      await this.appointmentRepository.save(appointment);
      return appointment;
    } catch (error) {
      return new UnexpectedError(error instanceof Error ? error.message : String(error));
    }
  }
}
