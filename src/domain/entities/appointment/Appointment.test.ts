import { AppointmentEntity } from './AppointmentEntity';
import { MotorcycleTryEntity } from '../drives/MotorcycleTryEntity';
import { LocationEntity } from '../location/LocationEntity';
import {
  now,
  tomorrow,
  user,
  motorcycle,
  location,
  maintenance,
  repair,
  driver,
} from '../../../tests/testUtils';

describe('AppointmentEntity', () => {
  describe('create()', () => {
    it('should create an appointment with a Location reason', () => {
      const appointment = AppointmentEntity.create(
        user,
        now,
        tomorrow,
        { type: 'Location', entity: location },
        'Test notes',
      );

      expect(appointment).toBeInstanceOf(AppointmentEntity);
      if (appointment instanceof AppointmentEntity) {
        expect(appointment.appointmentReason.entity).toBe(location);
        expect(appointment.appointmentReason.type).toBe('Location');
      }
    });

    it('should create an appointment with a Maintenance reason', () => {
      const appointment = AppointmentEntity.create(
        user,
        now,
        tomorrow,
        { type: 'Maintenance', entity: maintenance },
        null,
      );

      expect(appointment).toBeInstanceOf(AppointmentEntity);
      if (appointment instanceof AppointmentEntity) {
        expect(appointment.appointmentReason.entity).toBe(maintenance);
        expect(appointment.appointmentReason.type).toBe('Maintenance');
      }
    });

    it('should create an appointment with a Repair reason', () => {
      const appointment = AppointmentEntity.create(
        user,
        now,
        tomorrow,
        { type: 'Repair', entity: repair },
        'Repair appointment notes',
      );

      expect(appointment).toBeInstanceOf(AppointmentEntity);
      if (appointment instanceof AppointmentEntity) {
        expect(appointment.appointmentReason.entity).toBe(repair);
        expect(appointment.appointmentReason.type).toBe('Repair');
      }
    });

    it('should create an appointment with a MotorcycleTry reason', () => {
      const motorcycleTry = MotorcycleTryEntity.create(
        motorcycle,
        driver,
        new Date(Date.now() + 1000 * 60 * 60 * 24),
        new Date(Date.now() + 4 * 24 * 60 * 60 * 1000),
      ) as MotorcycleTryEntity;

      const appointment = AppointmentEntity.create(
        user,
        now,
        tomorrow,
        { type: 'MotorcycleTry', entity: motorcycleTry },
        null,
      );

      expect(appointment).toBeInstanceOf(AppointmentEntity);
      if (appointment instanceof AppointmentEntity) {
        expect(appointment.appointmentReason.entity).toBe(motorcycleTry);
        expect(appointment.appointmentReason.type).toBe('MotorcycleTry');
      }
    });

    it('should fail to create an appointment if tomorrow is before now', () => {
      const invalidEndDate = new Date(now.getTime() - 1000);
      const result = AppointmentEntity.create(
        user,
        now,
        invalidEndDate,
        { type: 'Location', entity: {} as LocationEntity },
        null,
      );

      expect(result).toBeInstanceOf(Error);
    });
  });

  describe('getDetails()', () => {
    it('should return appointment details', () => {
      const appointment = AppointmentEntity.create(
        user,
        new Date(),
        new Date(Date.now() + 3600000),
        { type: 'Location', entity: location },
        'Test notes',
      ) as AppointmentEntity;

      const details = appointment.getDetails();

      expect(details.reason.type).toBe('Location');
      expect(details.reason.entity).toBe(location);
    });
  });
});
