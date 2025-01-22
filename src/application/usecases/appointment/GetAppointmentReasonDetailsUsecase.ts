import { AppointmentRepository } from "src/application/repositories/AppointmentRepository";
import { UnexpectedError } from "src/domain/errors/user/UnexpectedError";

export class GetAppointmentReasonDetailsUsecase {
  public constructor(
    private readonly appointmentRepository: AppointmentRepository
  ) {}

  public async execute(appointmentId: string): Promise<unknown | Error> {
    try {
      const appointment = await this.appointmentRepository.findById(appointmentId);
      if (appointment instanceof Error) return appointment;

      const reasonDetails = appointment.getReasonDetails();

      return reasonDetails;
    } catch (error) {
      return new UnexpectedError(error instanceof Error ? error.message : String(error));
    }
  }
}
