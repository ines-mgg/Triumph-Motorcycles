import { MaintenanceNotificationType } from '@triumph-motorcycles/domain/types/motorcycle';
import { MaintenanceNotificationEntity } from '../MaintenanceNotificationEntity';
import { MaintenanceNotificationDate } from '@triumph-motorcycles/domain/values/maintenanceNotification/MaintenanceNotificationDate';
import { MaintenanceNotificationMessage } from '@triumph-motorcycles/domain/values/maintenanceNotification/MaintenanceNotificationMessage';

describe('MaintenanceNotificationEntity', () => {
  describe('create', () => {
    it('should successfully create a MaintenanceNotificationEntity with valid inputs', () => {
      const validMessage = 'Service Reminder';
      const validDate = new Date(Date.now() + 1000 * 60 * 60 * 24);
      const validType: MaintenanceNotificationType = 'ServiceReminder';

      const notification = MaintenanceNotificationEntity.create(
        validMessage,
        validDate,
        validType,
      );

      expect(notification).not.toBeInstanceOf(Error);
      if (!(notification instanceof Error)) {
        expect(notification.message.value).toBe(validMessage);
        expect(notification.date.value.getTime()).toBe(validDate.getTime());
        expect(notification.type).toBe(validType);
        expect(notification.isRead).toBe(false);
      }
    });

    it('should return an error when the message is invalid', () => {
      const invalidMessage = '';
      const validDate = new Date(Date.now() + 1000 * 60 * 60 * 24);
      const validType: MaintenanceNotificationType = 'ServiceReminder';

      const notification = MaintenanceNotificationEntity.create(
        invalidMessage,
        validDate,
        validType,
      );

      expect(notification).toBeInstanceOf(Error);
    });

    it('should return an error when the date is invalid', () => {
      const validMessage = 'Stock Alert';
      const invalidDate = new Date(Date.now() - 1000 * 60 * 60 * 24);
      const validType: MaintenanceNotificationType = 'StockAlert';

      const notification = MaintenanceNotificationEntity.create(
        validMessage,
        invalidDate,
        validType,
      );

      expect(notification).toBeInstanceOf(Error);
    });
  });

  describe('markAsRead', () => {
    it('should mark the notification as read', () => {
      const validMessage = 'Incident Report';
      const validDate = new Date(Date.now() + 1000 * 60 * 60 * 24);
      const validType: MaintenanceNotificationType = 'IncidentReport';

      const notification = MaintenanceNotificationEntity.create(
        validMessage,
        validDate,
        validType,
      );

      if (notification instanceof Error) {
        throw new Error('Failed to create notification for testing markAsRead');
      }

      expect(notification.isRead).toBe(false);

      notification.markAsRead();
      expect(notification.isRead).toBe(true);
    });
  });
});

describe('MaintenanceNotificationMessage', () => {
  it('should create a valid MaintenanceNotificationMessage', () => {
    const validMessage = 'Service Reminder';
    const message = MaintenanceNotificationMessage.from(validMessage);

    expect(message).not.toBeInstanceOf(Error);
    if (!(message instanceof Error)) {
      expect(message.value).toBe(validMessage);
    }
  });

  it('should return an error for an invalid message', () => {
    const invalidMessage = '';
    const message = MaintenanceNotificationMessage.from(invalidMessage);

    expect(message).toBeInstanceOf(Error);
  });
});

describe('MaintenanceNotificationDate', () => {
  it('should create a valid MaintenanceNotificationDate', () => {
    const validDate = new Date(Date.now() + 1000 * 60 * 60 * 24);
    const date = MaintenanceNotificationDate.from(validDate);

    expect(date).not.toBeInstanceOf(Error);
    if (!(date instanceof Error)) {
      expect(date.value.getTime()).toBe(validDate.getTime());
    }
  });

  it('should return an error for an invalid date', () => {
    const invalidDate = new Date(Date.now() - 1000 * 60 * 60 * 24);
    const date = MaintenanceNotificationDate.from(invalidDate);

    expect(date).toBeInstanceOf(Error);
  });
});
