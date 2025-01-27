import { AppointmentEntity } from '@triumph-motorcycles/domain/entities';
import { AppointmentNotFoundError } from '@triumph-motorcycles/domain/errors';

export interface AppointmentRepository {
  save(appointment: AppointmentEntity): Promise<void>;
  findById(
    appointmentId: string,
  ): Promise<AppointmentEntity | AppointmentNotFoundError>;
  findByUserId(
    userId: string,
  ): Promise<AppointmentEntity[] | AppointmentNotFoundError>;
  update(appointment: AppointmentEntity): Promise<void>;
  delete(appointmentId: string): Promise<void>;
}
