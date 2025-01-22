import { AppointmentRepository } from "src/application/repositories/AppointmentRepository";
import { AppointmentEntity } from "src/domain/entities/appointment/AppointmentEntity";
import { UserEntity } from "src/domain/entities/user/UserEntity";
import { UnexpectedError } from "src/domain/errors/user/UnexpectedError";
import { AppointmentReason } from "src/domain/types/AppointmentReason";

export class CreateAppointmentUsecase {
  public constructor(
    private readonly appointmentRepository: AppointmentRepository
  ) {}

  public async execute(
    user: UserEntity,
    startTime: Date,
    endTime: Date,
    notes: string | null,
    reason: AppointmentReason,
  ): Promise<AppointmentEntity | Error> {
    try {
      const newAppointment = AppointmentEntity.create(user, startTime, endTime, reason, notes);
      if (newAppointment instanceof Error) return newAppointment;

      await this.appointmentRepository.save(newAppointment);
      return newAppointment;
    } catch (error) {
      return new UnexpectedError(error instanceof Error ? error.message : String(error));
    }
  }
}
