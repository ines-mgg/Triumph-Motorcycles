import { StartDate } from '../MotorcycleTryStartDate';
import { MotorcycleTryStartDateError } from '@triumph-motorcycles/domain/errors';
describe('MotorcycleTryStartDate', () => {
  it('should create a valid MotorcycleTryStartDate instance', () => {
    const now = new Date();
    const motorcycleTryStartDate = StartDate.from(now);
    expect(motorcycleTryStartDate).toBeInstanceOf(StartDate);
    if (motorcycleTryStartDate instanceof StartDate) {
      expect(motorcycleTryStartDate.value).toStrictEqual(now);
    }
  });
  it('should return an error for invalid motorcycleTryStartDate', () => {
    const value = new Date('2023-01-01');
    const motorcycleTryStartDate = StartDate.from(value);
    expect(motorcycleTryStartDate).toBeInstanceOf(MotorcycleTryStartDateError);
  });
});
