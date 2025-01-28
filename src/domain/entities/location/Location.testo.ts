// TODO: fix not working tests
import { LocationEntity } from './LocationEntity';

import { user, motorcycle } from '../../../tests/testUtils';
import { CancelLocationError } from '@triumph-motorcycles/domain/errors/location/CancelLocationError';
import { EndDateError } from '@triumph-motorcycles/domain/errors/location/EndDateError';
import { EndLocationError } from '@triumph-motorcycles/domain/errors/location/EndLocationError';

describe('LocationEntity', () => {
  const cost = 100;
  const startDate = new Date();

  it('should create a location entity with valid properties', () => {
    const location = LocationEntity.create(motorcycle, user, startDate, cost);

    expect(location).toBeDefined();

    if (location instanceof LocationEntity) {
      expect(location.id).toBeDefined();
      expect(location.status).toBe('in-progress');
      expect(location.cost).toBe(cost);
      expect(location.startDate.value).toBe(startDate);
    }
  });

  it('should end location with a valid end date', () => {
    const location = LocationEntity.create(
      motorcycle,
      user,
      startDate,
      cost,
    ) as LocationEntity;
    const endDate = new Date(new Date().getTime() + 1000 * 60 * 60);
    location.endLocation(endDate);

    expect(location.status).toBe('completed');
    expect(location.endDate).toBeDefined();
    expect(location.endDate?.value).toBe(endDate);
  });

  it('should not allow ending a completed or canceled location', () => {
    const location = LocationEntity.create(
      motorcycle,
      user,
      startDate,
      cost,
    ) as LocationEntity;
    location.status = 'completed';
    const endDate = new Date(new Date().getTime() + 1000 * 60 * 60);
    const result = location.endLocation(endDate);

    expect(result).toBeInstanceOf(EndLocationError);
  });

  it('should cancel location', () => {
    const location = LocationEntity.create(
      motorcycle,
      user,
      startDate,
      cost,
    ) as LocationEntity;
    location.cancelLocation();

    expect(location.status).toBe('canceled');
    expect(location.endDate).toBeNull();
  });

  it('should not allow canceling a completed or canceled location', () => {
    const location = LocationEntity.create(
      motorcycle,
      user,
      startDate,
      cost,
    ) as LocationEntity;
    location.status = 'completed';
    const result = location.cancelLocation();

    expect(result).toBeInstanceOf(CancelLocationError);
  });

  it('should calculate cost correctly when end date is provided', () => {
    const location = LocationEntity.create(
      motorcycle,
      user,
      startDate,
      cost,
    ) as LocationEntity;
    const endDate = new Date(startDate.getTime() + 1000 * 60 * 60);
    location.endLocation(endDate);

    location.calculateCost();
    expect(location.cost).toBeCloseTo(10, 2);
  });

  it('should return an error when trying to calculate cost without an end date', () => {
    const location = LocationEntity.create(
      motorcycle,
      user,
      startDate,
      cost,
    ) as LocationEntity;
    location.endDate = null;
    const result = location.calculateCost();

    expect(result).toBeInstanceOf(EndDateError);
  });

  it('should return details of the location', () => {
    const location = LocationEntity.create(
      motorcycle,
      user,
      startDate,
      cost,
    ) as LocationEntity;
    const details = location.getDetails();

    expect(details).toHaveProperty('id');
    expect(details).toHaveProperty('motorcycle');
    expect(details).toHaveProperty('user');
    expect(details).toHaveProperty('startDate');
    expect(details).toHaveProperty('status');
    expect(details).toHaveProperty('cost');
  });

  it('should not add duplicate motorcycles', () => {
    const location = LocationEntity.create(
      motorcycle,
      user,
      startDate,
      cost,
    ) as LocationEntity;

    location.motorcycle = motorcycle;
    const initialMotorcycle = location.motorcycle;

    location.motorcycle = initialMotorcycle;

    expect(location.motorcycle).toBe(initialMotorcycle);
  });

  it('should generate a new id for each location', () => {
    const location1 = LocationEntity.create(
      motorcycle,
      user,
      startDate,
      cost,
    ) as LocationEntity;
    const location2 = LocationEntity.create(
      motorcycle,
      user,
      startDate,
      cost,
    ) as LocationEntity;

    expect(location1.id).not.toBe(location2.id);
  });
});
