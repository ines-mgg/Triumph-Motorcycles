import { AppointmentEntity } from "src/domain/entities/appointment/AppointmentEntity";
import { AppointmentNotFoundError } from "src/domain/errors/appointment/AppointmentNotFoundError";

export interface AppointmentRepository {
  save(appointment: AppointmentEntity): Promise<void>;
  findById(appointmentId: string): Promise<AppointmentEntity | AppointmentNotFoundError>;
  findByUserId(userId: string): Promise<AppointmentEntity[] | AppointmentNotFoundError>;
  update(appointment: AppointmentEntity): Promise<void>;
  delete(appointmentId: string): Promise<void>;
}

