import { MaintenanceNotificationDate } from '../MaintenanceNotificationDate';
import { MaintenanceNotificationDateError } from '@triumph-motorcycles/domain/errors';

describe('MaintenanceNotificationDate', () => {
  it('should create a valid MaintenanceNotificationDate instance', () => {
    const now = new Date();
    const maintenanceNotificationDate = MaintenanceNotificationDate.from(now);
    expect(maintenanceNotificationDate).toBeInstanceOf(
      MaintenanceNotificationDate,
    );
    if (maintenanceNotificationDate instanceof MaintenanceNotificationDate) {
      expect(maintenanceNotificationDate.value).toStrictEqual(now);
    }
  });
  it('should return an error for invalid maintenanceNotificationDate', () => {
    const value = new Date('2001-07-07');
    const maintenanceNotificationDate = MaintenanceNotificationDate.from(value);
    expect(maintenanceNotificationDate).toBeInstanceOf(
      MaintenanceNotificationDateError,
    );
  });

  it('should compare note value correctly', () => {
    const now = new Date();
    const maintenanceNotificationDate = MaintenanceNotificationDate.from(now);
    if (maintenanceNotificationDate instanceof MaintenanceNotificationDate) {
      expect(maintenanceNotificationDate.isValue(now)).toStrictEqual(true);
    }
  });
});
