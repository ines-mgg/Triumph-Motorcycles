import { v4 as uuidv4 } from 'uuid';
import {
  AppointmentReason,
  AppointmentStatus,
} from '@triumph-motorcycles/domain/types';
import { UserEntity } from '../user/UserEntity';
import { Notes, TimeRange } from '@triumph-motorcycles/domain/values';

export class AppointmentEntity {
  private constructor(
    public readonly appointmentId: string,
    public readonly user: UserEntity,
    private timeRange: TimeRange,
    private appointmentNotes: Notes | null,
    private appointmentStatus: AppointmentStatus,
    public readonly createdAt: Date,
    private updatedAt: Date,
    public appointmentReason: AppointmentReason,
  ) {}

  public static create(
    user: UserEntity,
    startTime: Date,
    endTime: Date,
    reason: AppointmentReason,
    notes: string | null,
  ): AppointmentEntity | Error {
    const appointmentId = uuidv4();

    const timeRange = TimeRange.from(startTime, endTime);
    if (timeRange instanceof Error) return timeRange;

    let notesValue: Notes | null = null;
    if (notes) {
      const notesObject = Notes.from(notes);
      if (notesObject instanceof Error) return notesObject;
      notesValue = notesObject;
    }

    return new AppointmentEntity(
      appointmentId,
      user,
      timeRange,
      notesValue,
      'Pending',
      new Date(),
      new Date(),
      reason,
    );
  }

  public updateTimeRange(startTime: Date, endTime: Date): void | Error {
    const newTimeRange = TimeRange.from(startTime, endTime);
    if (newTimeRange instanceof Error) return newTimeRange;

    this.timeRange = newTimeRange;
    this.updatedAt = new Date();
  }

  public updateNotes(newNotes: string | null): void | Error {
    if (newNotes) {
      const notesValue = Notes.from(newNotes);
      if (notesValue instanceof Error) return notesValue;

      this.appointmentNotes = notesValue;
    } else {
      this.appointmentNotes = null;
    }

    this.updatedAt = new Date();
  }

  public updateStatus(newStatus: AppointmentStatus): void {
    this.appointmentStatus = newStatus;
    this.updatedAt = new Date();
  }

  public updateReason(newReason: AppointmentReason): void {
    this.appointmentReason = newReason;
    this.updatedAt = new Date();
  }

  public getDetails(): {
    user: UserEntity;
    timeRange: { startTime: Date; endTime: Date };
    notes: string | null;
    status: AppointmentStatus;
    reason: AppointmentReason;
    updatedAt: Date;
  } {
    return {
      user: this.user,
      timeRange: this.timeRange.value,
      notes: this.appointmentNotes ? this.appointmentNotes.value : null,
      status: this.appointmentStatus,
      reason: this.appointmentReason,
      updatedAt: this.updatedAt,
    };
  }

  public getReasonDetails(): object {
    switch (this.appointmentReason.type) {
      case 'Location':
        return this.appointmentReason.entity.getDetails();
      case 'Maintenance':
        return {
          needsMaintenance: this.appointmentReason.entity.needsMaintenance(),
        };
      case 'Repair':
        return {
          repairActions: this.appointmentReason.entity.actions,
          cost: this.appointmentReason.entity.cost.value,
        };
      case 'MotorcycleTry':
        return {
          summary: this.appointmentReason.entity.getTestSummary(),
        };
      default:
        return {};
    }
  }
}
