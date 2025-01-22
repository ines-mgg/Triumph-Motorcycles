import { AppointmentEntity } from "./AppointmentEntity";
import { LocationEntity } from "../location/LocationEntity";
import { UserEntity } from "../user/UserEntity";
import { DriverEntity, MotorcycleEntity, MotorcycleTryEntity } from "../drives";
import { CommonRepairAction, MotorStatus } from "../../types/motorcycle";
import { BreakdownEntity, MaintenanceEntity, RepairEntity } from "../maintenances";

describe("AppointmentEntity", () => {
  let user: UserEntity;
  let motorcycle: MotorcycleEntity;
  let validBreakdown: BreakdownEntity;
  let driver: DriverEntity;

  const setupTestData = () => {
    user = UserEntity.create("validUser", "Valid@123", new Date(), new Date()) as UserEntity;

    motorcycle = MotorcycleEntity.create(
      "Yamaha",
      "MT-09",
      2023,
      new Date("2023-01-01"),
      "Available" as MotorStatus
    ) as MotorcycleEntity;

    validBreakdown = BreakdownEntity.create(
      motorcycle,
      "Engine failure",
      new Date(Date.now() - 1000 * 60 * 60 * 24),
      null
    ) as BreakdownEntity;

    driver = DriverEntity.create(
      "John Doe",
      "A",
      "AB12345678",
      5,
      "john.doe@example.com",
      "1234567890"
    ) as DriverEntity;
  };

  beforeAll(setupTestData);

  describe("create()", () => {
    const startDate = new Date();
    const endDate = new Date(Date.now() + 3600000);

    it("should create an appointment with a Location reason", () => {
      const location = LocationEntity.create(motorcycle, user, new Date(), 100) as LocationEntity;
      const appointment = AppointmentEntity.create(
        user,
        startDate,
        endDate,
        { type: "Location", entity: location },
        "Test notes"
      );

      expect(appointment).toBeInstanceOf(AppointmentEntity);
      if (appointment instanceof AppointmentEntity) {
        expect(appointment.appointmentReason.entity).toBe(location);
        expect(appointment.appointmentReason.type).toBe("Location");
      }
    });

    it("should create an appointment with a Maintenance reason", () => {
      const maintenance = MaintenanceEntity.create(motorcycle, 5000, 180) as MaintenanceEntity;
      const appointment = AppointmentEntity.create(
        user,
        startDate,
        endDate,
        { type: "Maintenance", entity: maintenance },
        null
      );

      expect(appointment).toBeInstanceOf(AppointmentEntity);
      if (appointment instanceof AppointmentEntity) {
        expect(appointment.appointmentReason.entity).toBe(maintenance);
        expect(appointment.appointmentReason.type).toBe("Maintenance");
      }
    });

    it("should create an appointment with a Repair reason", () => {
      const repair = RepairEntity.create(
        validBreakdown,
        new Date(Date.now() + 1000 * 60 * 60 * 24),
        ["Oil Change", "Brake Replacement"] as CommonRepairAction[],
        500
      ) as RepairEntity;

      const appointment = AppointmentEntity.create(
        user,
        startDate,
        endDate,
        { type: "Repair", entity: repair },
        "Repair appointment notes"
      );

      expect(appointment).toBeInstanceOf(AppointmentEntity);
      if (appointment instanceof AppointmentEntity) {
        expect(appointment.appointmentReason.entity).toBe(repair);
        expect(appointment.appointmentReason.type).toBe("Repair");
      }
    });

    it("should create an appointment with a MotorcycleTry reason", () => {
      const motorcycleTry = MotorcycleTryEntity.create(
        motorcycle,
        driver,
        new Date(Date.now() + 1000 * 60 * 60 * 24),
        new Date(Date.now() + 4 * 24 * 60 * 60 * 1000)
      ) as MotorcycleTryEntity;

      const appointment = AppointmentEntity.create(
        user,
        startDate,
        endDate,
        { type: "MotorcycleTry", entity: motorcycleTry },
        null
      );

      expect(appointment).toBeInstanceOf(AppointmentEntity);
      if (appointment instanceof AppointmentEntity) {
        expect(appointment.appointmentReason.entity).toBe(motorcycleTry);
        expect(appointment.appointmentReason.type).toBe("MotorcycleTry");
      }
    });

    it("should fail to create an appointment if endDate is before startDate", () => {
      const invalidEndDate = new Date(startDate.getTime() - 1000);
      const result = AppointmentEntity.create(
        user,
        startDate,
        invalidEndDate,
        { type: "Location", entity: {} as LocationEntity },
        null
      );

      expect(result).toBeInstanceOf(Error);
    });
  });

  describe("getDetails()", () => {
    it("should return appointment details", () => {
      const location = LocationEntity.create(motorcycle, user, new Date(), 100) as LocationEntity;
      const appointment = AppointmentEntity.create(
        user,
        new Date(),
        new Date(Date.now() + 3600000),
        { type: "Location", entity: location },
        "Test notes"
      ) as AppointmentEntity;

      const details = appointment.getDetails();

      expect(details.reason.type).toBe("Location");
      expect(details.reason.entity).toBe(location);
    });
  });
});
