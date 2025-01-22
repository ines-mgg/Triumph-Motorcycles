import { AppointmentRepository } from "src/application/repositories/AppointmentRepository";
import { AppointmentEntity } from "src/domain/entities/appointment/AppointmentEntity";
import { UnexpectedError } from "src/domain/errors/user/UnexpectedError";
import { AppointmentStatus } from "src/domain/types/AppointmentStatus";

export class UpdateAppointmentStatusUsecase {
  public constructor(
    private readonly appointmentRepository: AppointmentRepository
  ) {}

  public async execute(
    appointmentId: string,
    newStatus: AppointmentStatus
  ): Promise<AppointmentEntity | Error> {
    try {
      const appointment = await this.appointmentRepository.findById(appointmentId);
      if (appointment instanceof Error) return appointment;

      const updateResult = appointment.updateStatus(newStatus);
      if (updateResult instanceof Error) return updateResult;

      await this.appointmentRepository.save(appointment);
      return appointment;
    } catch (error) {
      return new UnexpectedError(error instanceof Error ? error.message : String(error));
    }
  }
}
