import { UserEntity } from "../user/UserEntity";
import { AppointmentStatus } from "../../types/AppointmentStatus";
import { Notes } from "../../values/appointment/Notes";
import { TimeRange } from "../../values/appointment/TimeRange";
import crypto from 'crypto';

export class AppointmentEntity {
  private constructor(
    public readonly appointmentId: string,
    public readonly user: UserEntity,
    private timeRange: TimeRange,
    private appointmentNotes: Notes | null,
    private appointmentStatus: AppointmentStatus,
    public readonly createdAt: Date,
    private updatedAt: Date
  ) {}

  public static create(
    user: UserEntity,
    startTime: Date,
    endTime: Date,
    notes: string | null
  ): AppointmentEntity | Error {

    const appointmentId = crypto.randomUUID();
    
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
      "Pending",
      new Date(),
      new Date()
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

  public updateStatus(newStatus: AppointmentStatus): void | Error {
    this.appointmentStatus = newStatus;
    this.updatedAt = new Date();
  }

  public getDetails(): {
    user: UserEntity;
    timeRange: { startTime: Date; endTime: Date };
    notes: string | null;
    status: AppointmentStatus;
    updatedAt: Date;
  } {
    return {
      user: this.user,
      timeRange: this.timeRange.value,
      notes: this.appointmentNotes ? this.appointmentNotes.value : null,
      status: this.appointmentStatus,
      updatedAt: this.updatedAt,  
    };
  }
}
