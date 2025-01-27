import {
  MotorcycleTryEndDateError,
  MotorcycleTryStartDateError,
} from '@triumph-motorcycles/domain/errors';
import { MotorcycleTryEntity } from '../MotorcycleTryEntity';
import { motorcycle, driver } from '../../../../tests/testUtils';

describe('MotorcycleTryEntity', () => {
  it('should create a valid MotorcycleTryEntity', () => {
    const startDate = new Date(Date.now() + 1000 * 60 * 60 * 24);
    const endDate = new Date(startDate.getTime() + 3 * 24 * 60 * 60 * 1000);

    const test = MotorcycleTryEntity.create(
      motorcycle,
      driver,
      startDate,
      endDate,
    );

    expect(test).toBeInstanceOf(MotorcycleTryEntity);
    expect(test).toMatchObject({
      motorcycle,
      driver,
      startDate: { value: startDate },
      endDate: { value: endDate },
    });
  });

  it('should throw MotorcycleTryStartDateError if start date is invalid', () => {
    const invalidStartDate = new Date(Date.now() - 1000 * 60 * 60 * 24);
    const endDate = new Date(Date.now() + 2 * 1000 * 60 * 60 * 24);

    const result = MotorcycleTryEntity.create(
      motorcycle,
      driver,
      invalidStartDate,
      endDate,
    );

    expect(result).toBeInstanceOf(MotorcycleTryStartDateError);
  });

  it('should return MotorcycleTryEndDateError if end date is invalid', () => {
    const startDate = new Date(Date.now() + 1000 * 60 * 60 * 24);
    const invalidEndDate = new Date(startDate.getTime() - 1000 * 60 * 60 * 24);

    const result = MotorcycleTryEntity.create(
      motorcycle,
      driver,
      startDate,
      invalidEndDate,
    );

    expect(result).toBeInstanceOf(MotorcycleTryEndDateError);
  });

  it('should calculate test duration when end date is set', () => {
    const startDate = new Date(Date.now() + 1000 * 60 * 60 * 24);
    const endDate = new Date(startDate.getTime() + 5 * 24 * 60 * 60 * 1000);

    const test = MotorcycleTryEntity.create(
      motorcycle,
      driver,
      startDate,
      endDate,
    ) as MotorcycleTryEntity;

    expect(test.getTestDuration()).toBe(5);
  });

  it('should return a summary of the test', () => {
    const startDate = new Date(Date.now() + 1000 * 60 * 60 * 24);
    const endDate = new Date(startDate.getTime() + 3 * 24 * 60 * 60 * 1000);

    const test = MotorcycleTryEntity.create(
      motorcycle,
      driver,
      startDate,
      endDate,
    ) as MotorcycleTryEntity;

    expect(test.getTestSummary()).toBe(
      `Moto Test ID: ${test.id} | DriverEntity: ${driver.name} | Motorcycle: ${motorcycle.model} | Status: Completed in 3 days`,
    );
  });
});
