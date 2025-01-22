import { AppointmentRepository } from "src/application/repositories/AppointmentRepository";
import { UnexpectedError } from "src/domain/errors/user/UnexpectedError";

export class DeleteAppointmentUsecase {
  public constructor(
    private readonly appointmentRepository: AppointmentRepository
  ) {}

  public async execute(appointmentId: string): Promise<boolean | Error> {
    try {
      const appointment = await this.appointmentRepository.findById(appointmentId);
      if (appointment instanceof Error) return appointment;

      await this.appointmentRepository.delete(appointmentId);
      return true;
    } catch (error) {
      return new UnexpectedError(error instanceof Error ? error.message : String(error));
    }
  }
}
