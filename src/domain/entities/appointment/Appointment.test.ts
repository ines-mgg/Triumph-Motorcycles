import { Username } from "../../values/user/Username";
import { UserEntity } from "../user/UserEntity";
import { Password } from "../../values/user/Password";
import { AppointmentEntity } from "./AppointmentEntity";

describe("AppointmentEntity", () => {
  const now = new Date();
  let user: UserEntity;

  beforeAll(() => {
    const username = Username.from("validUsername");
    const password = Password.from("Valid@123");
   
    if (username instanceof Error || password instanceof Error) {
      throw new Error("Invalid mock user creation.");
    }
    user = UserEntity.create(username.value, password.value, now, now) as UserEntity;
  });

  describe("create()", () => {
    it("should create a valid appointment entity", () => {
      const startTime = new Date();
      const endTime = new Date(startTime.getTime() + 60 * 60 * 1000);
      const notes = "Valid appointment notes";

      const appointment = AppointmentEntity.create(user, startTime, endTime, notes);
      expect(appointment).toBeInstanceOf(AppointmentEntity);

      const details = (appointment as AppointmentEntity).getDetails();
      expect(details.user).toEqual(user);
      expect(details.timeRange.startTime).toEqual(startTime);
      expect(details.timeRange.endTime).toEqual(endTime);
      expect(details.notes).toEqual(notes);
      expect(details.status).toEqual("Pending");
    });

    it("should return an error for invalid time range", () => {
      const startTime = new Date();
      const endTime = new Date(startTime.getTime() - 60 * 60 * 1000); 
      const notes = "Invalid time range notes.";

      const appointment = AppointmentEntity.create(user, startTime, endTime, notes);
      expect(appointment).toBeInstanceOf(Error);
    });

    it("should return an error for invalid notes", () => {
      const startTime = new Date();
      const endTime = new Date(startTime.getTime() + 60 * 60 * 1000);
      const notes = "Invalid notes!@#$%^&*()";

      const appointment = AppointmentEntity.create(user, startTime, endTime, notes);
      expect(appointment).toBeInstanceOf(Error);
    });
  });

  describe("updateTimeRange()", () => {
    it("should update the time range successfully", () => {
      const appointment = AppointmentEntity.create(
        user,
        new Date(),
        new Date(Date.now() + 60 * 60 * 1000),
        null
      ) as AppointmentEntity;

      const newStartTime = new Date();
      const newEndTime = new Date(newStartTime.getTime() + 2 * 60 * 60 * 1000); 

      const result = appointment.updateTimeRange(newStartTime, newEndTime);
      expect(result).toBeUndefined();

      const details = appointment.getDetails();
      expect(details.timeRange.startTime).toEqual(newStartTime);
      expect(details.timeRange.endTime).toEqual(newEndTime);
    });

    it("should return an error for invalid updated time range", () => {
      const appointment = AppointmentEntity.create(
        user,
        new Date(),
        new Date(Date.now() + 60 * 60 * 1000),
        null
      ) as AppointmentEntity;

      const newStartTime = new Date();
      const newEndTime = new Date(newStartTime.getTime() - 60 * 60 * 1000); 

      const result = appointment.updateTimeRange(newStartTime, newEndTime);
      expect(result).toBeInstanceOf(Error);
    });
  });

  describe("updateNotes()", () => {
    it("should update notes successfully", () => {
      const appointment = AppointmentEntity.create(
        user,
        new Date(),
        new Date(Date.now() + 60 * 60 * 1000),
        null
      ) as AppointmentEntity;

      const newNotes = "Updated valid notes";
      const result = appointment.updateNotes(newNotes);
      expect(result).toBeUndefined();

      const details = appointment.getDetails();
      expect(details.notes).toEqual(newNotes);
    });

    it("should return an error for invalid notes update", () => {
      const appointment = AppointmentEntity.create(
        user,
        new Date(),
        new Date(Date.now() + 60 * 60 * 1000),
        null
      ) as AppointmentEntity;

      const invalidNotes = "Invalid notes!@#$%^&*()";
      const result = appointment.updateNotes(invalidNotes);
      expect(result).toBeInstanceOf(Error);
    });

    it("should clear notes when updated with null", () => {
      const appointment = AppointmentEntity.create(
        user,
        new Date(),
        new Date(Date.now() + 60 * 60 * 1000),
        "Initial valid notes"
      ) as AppointmentEntity;

      const result = appointment.updateNotes(null);
      expect(result).toBeUndefined();

      const details = appointment.getDetails();
      expect(details.notes).toBeNull();
    });
  });

  describe("updateStatus()", () => {
    it("should update the appointment status successfully", () => {
      const appointment = AppointmentEntity.create(
        user,
        new Date(),
        new Date(Date.now() + 60 * 60 * 1000),
        null
      ) as AppointmentEntity;

      appointment.updateStatus("Completed");
      const details = appointment.getDetails();
      expect(details.status).toEqual("Completed");
    });
  });
});
