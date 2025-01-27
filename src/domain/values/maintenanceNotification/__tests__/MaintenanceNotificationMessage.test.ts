import { MaintenanceNotificationMessage } from '../MaintenanceNotificationMessage';
import { MaintenanceNotificationMessageError } from '@triumph-motorcycles/domain/errors';

const MAX_MESSAGE_LENGTH = 10000;

describe('MaintenanceNotificationMessage', () => {
  it('should create a valid MaintenanceNotificationMessage instance', () => {
    const value = 'Valid maintenance notification message';
    const message = MaintenanceNotificationMessage.from(value);
    expect(message).toBeInstanceOf(MaintenanceNotificationMessage);
    if (message instanceof MaintenanceNotificationMessage) {
      expect(message.value).toBe(value);
    }
  });

  it('should return an error for empty message', () => {
    const value = '';
    const message = MaintenanceNotificationMessage.from(value);
    expect(message).toBeInstanceOf(MaintenanceNotificationMessageError);
  });

  it('should return an error for message with invalid characters', () => {
    const value = 'Invalid message!';
    const message = MaintenanceNotificationMessage.from(value);
    expect(message).toBeInstanceOf(MaintenanceNotificationMessageError);
  });

  it('should return an error for message exceeding max length', () => {
    const value = 'A'.repeat(MAX_MESSAGE_LENGTH + 1);
    const message = MaintenanceNotificationMessage.from(value);
    expect(message).toBeInstanceOf(MaintenanceNotificationMessageError);
  });

  it('should compare message value correctly', () => {
    const value = 'Valid maintenance notification message';
    const message = MaintenanceNotificationMessage.from(value);
    if (message instanceof MaintenanceNotificationMessage) {
      expect(message.isValue(value)).toBe(true);
      expect(message.isValue('Different message')).toBe(false);
    }
  });
});
