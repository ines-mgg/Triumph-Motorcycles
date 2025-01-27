import { AppointmentRepository } from '@triumph-motorcycles/application/repositories';
import { UnexpectedError } from '@triumph-motorcycles/domain/errors';

export class GetAppointmentDetailsUsecase {
  public constructor(
    private readonly appointmentRepository: AppointmentRepository,
  ) {}

  public async execute(appointmentId: string): Promise<
    | {
        user: any;
        timeRange: { startTime: Date; endTime: Date };
        notes: string | null;
        status: string;
        updatedAt: Date;
      }
    | Error
  > {
    try {
      const appointment = await this.appointmentRepository.findById(
        appointmentId,
      );
      if (appointment instanceof Error) return appointment;

      return appointment.getDetails();
    } catch (error) {
      return new UnexpectedError(
        error instanceof Error ? error.message : String(error),
      );
    }
  }
}
