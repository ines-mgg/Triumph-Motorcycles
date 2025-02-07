import { AppointmentEntity } from '@triumph-motorcycles/domain/entities/appointment/AppointmentEntity';
import { AppointmentNotFoundError } from '@triumph-motorcycles/domain/errors/appointment/AppointmentNotFoundError';
import { AppointmentReason } from '@triumph-motorcycles/domain/types/AppointmentReason';
import { AppointmentStatus } from '@triumph-motorcycles/domain/types/AppointmentStatus';

export interface AppointmentRepository {
  save(appointment: AppointmentEntity): Promise<void>;
  findById(
    appointmentId: string,
  ): Promise<AppointmentEntity | AppointmentNotFoundError>;
  findByUserId(
    userId: string,
  ): Promise<AppointmentEntity[] | AppointmentNotFoundError>;
  findByCompany(
    companyId: string,
  ): Promise<AppointmentEntity[] | AppointmentNotFoundError>;
  findByDateRange(
    startTime: Date,
    endTime: Date,
    companyId: string,
  ): Promise<AppointmentEntity[] | AppointmentNotFoundError>;
  findAll(): Promise<AppointmentEntity[] | AppointmentNotFoundError>;
  update(appointment: AppointmentEntity): Promise<void>;
  updateStatus(
    appointmentId: string,
    AppointmentStatus: AppointmentStatus,
    reason: AppointmentReason,
  ): Promise<void>;
  cancel(appointementId: string): Promise<void>;
  complete(appointementId: string): Promise<void>;
  delete(appointmentId: string): Promise<void>;
}
