import { AppointmentRepository } from '@triumph-motorcycles/application/repositories';
import {
  AppointmentEntity,
  UserEntity,
} from '@triumph-motorcycles/domain/entities';
import { UnexpectedError } from '@triumph-motorcycles/domain/errors';
import { AppointmentReason } from '@triumph-motorcycles/domain/types';

export class CreateAppointmentUsecase {
  public constructor(
    private readonly appointmentRepository: AppointmentRepository,
  ) {}

  public async execute(
    user: UserEntity,
    startTime: Date,
    endTime: Date,
    notes: string | null,
    reason: AppointmentReason,
  ): Promise<AppointmentEntity | Error> {
    try {
      const newAppointment = AppointmentEntity.create(
        user,
        startTime,
        endTime,
        reason,
        notes,
      );
      if (newAppointment instanceof Error) return newAppointment;

      await this.appointmentRepository.save(newAppointment);
      return newAppointment;
    } catch (error) {
      return new UnexpectedError(
        error instanceof Error ? error.message : String(error),
      );
    }
  }
}
