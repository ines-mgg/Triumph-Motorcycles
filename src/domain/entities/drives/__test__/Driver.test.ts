import {
  DriverEmailError,
  DriverNameError,
  ExperienceError,
} from '@triumph-motorcycles/domain/errors';
import { DriverEntity } from '../DriverEntity';

import { DrivingRecord } from '@triumph-motorcycles/domain/types';

describe('DriverEntity', () => {
  it('should create a driver entity successfully with valid inputs', () => {
    const driver = DriverEntity.create(
      'John Doe',
      'A',
      'AB12345678',
      5,
      'john.doe@example.com',
      '1234567890',
    );

    expect(driver).toBeInstanceOf(DriverEntity);

    if (driver instanceof DriverEntity) {
      expect(driver.name.value).toBe('John Doe');
      expect(driver.license.value).toBe('AB12345678');
      expect(driver.yearsOfExperience.value).toBe(5);
      expect(driver.email.value).toBe('john.doe@example.com');
      expect(driver.phone.value).toBe('1234567890');
    } else {
      fail('Failed to create driver entity');
    }
  });

  it('should return an error when creating a driver with invalid name', () => {
    const driver = DriverEntity.create(
      'Jo',
      'B',
      'AB12345678',
      5,
      'john.doe@example.com',
      '1234567890',
    );

    expect(driver).toBeInstanceOf(DriverNameError);
  });

  it('should return an error when creating a driver with invalid email', () => {
    const driver = DriverEntity.create(
      'John Doe',
      'C',
      'AB12345678',
      5,
      'invalid-email',
      '1234567890',
    );

    expect(driver).toBeInstanceOf(DriverEmailError);
  });

  it('should add a driving record', () => {
    const driver = DriverEntity.create(
      'John Doe',
      'A',
      'AB12345678',
      5,
      'john.doe@example.com',
      '1234567890',
    ) as DriverEntity;

    const record: DrivingRecord = {
      motorcycleId: '1',
      type: 'Incident',
      date: new Date('2025-01-01'),
      details: 'Speeding',
    };

    driver.addDrivingRecord(record);

    expect(driver.getDrivingHistory()).toContain(record);
  });

  it('should update experience successfully', () => {
    const driver = DriverEntity.create(
      'John Doe',
      'A',
      'AB12345678',
      5,
      'john.doe@example.com',
      '1234567890',
    ) as DriverEntity;

    driver.updateExperience(6);
    expect(driver.yearsOfExperience.value).toBe(6);
  });

  it('should throw ExperienceError if new experience is less than current', () => {
    const driver = DriverEntity.create(
      'John Doe',
      'B',
      'AB12345678',
      5,
      'john.doe@example.com',
      '1234567890',
    ) as DriverEntity;

    expect(() => driver.updateExperience(4)).toThrow(ExperienceError);
  });

  it('should update contact info successfully', () => {
    const driver = DriverEntity.create(
      'John Doe',
      'C',
      'AB12345678',
      5,
      'john.doe@example.com',
      '1234567890',
    ) as DriverEntity;

    driver.updateContactInfo({
      email: 'new.email@example.com',
      phone: '0987654321',
    });

    expect(driver.email.value).toBe('new.email@example.com');
    expect(driver.phone.value).toBe('0987654321');
  });

  it('should throw error if invalid email is provided in updateContactInfo', () => {
    const driver = DriverEntity.create(
      'John Doe',
      'B',
      'AB12345678',
      5,
      'john.doe@example.com',
      '1234567890',
    ) as DriverEntity;

    expect(() =>
      driver.updateContactInfo({ email: 'invalid-email', phone: '0987654321' }),
    ).toThrow(DriverEmailError);
  });

  it('should detect if a driver has an incident in their driving history', () => {
    const driver = DriverEntity.create(
      'John Doe',
      'A',
      'AB12345678',
      5,
      'john.doe@example.com',
      '1234567890',
    ) as DriverEntity;

    const record: DrivingRecord = {
      motorcycleId: '1',
      type: 'Incident',
      date: new Date('2025-01-01'),
      details: 'Speeding',
    };
    driver.addDrivingRecord(record);

    expect(driver.hasIncidentHistory()).toBe(true);
  });

  it('should return false if no incidents in driving history', () => {
    const driver = DriverEntity.create(
      'John Doe',
      'A',
      'AB12345678',
      5,
      'john.doe@example.com',
      '1234567890',
    ) as DriverEntity;

    expect(driver.hasIncidentHistory()).toBe(false);
  });
});
