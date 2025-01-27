import { SparePartNotificationEntity } from '../SparePartNotificationEntity';
import { sparePart, sufficientStockPart } from '../../../../tests/testUtils';

describe('SparePartNotificationEntity', () => {
  test('should create a SparePartNotificationEntity with a unique id', () => {
    const notificationEntity = SparePartNotificationEntity.create([sparePart]);
    expect(notificationEntity).toBeInstanceOf(SparePartNotificationEntity);
    if (notificationEntity instanceof SparePartNotificationEntity)
      expect(notificationEntity.id).toBeDefined();
  });

  test('should check stock levels and create a notification when stock is low', () => {
    sparePart.use(10);
    const notificationEntity = SparePartNotificationEntity.create([sparePart]);

    if (notificationEntity instanceof SparePartNotificationEntity) {
      notificationEntity.checkStockLevels();
      const notifications = notificationEntity.getNotifications();
      expect(notifications.length).toBe(1);
    }
  });

  test('should not add duplicate notifications', () => {
    sparePart.use(10);
    const notificationEntity = SparePartNotificationEntity.create([sparePart]);
    if (notificationEntity instanceof SparePartNotificationEntity) {
      notificationEntity.checkStockLevels();
      notificationEntity.checkStockLevels();
      const notifications = notificationEntity.getNotifications();
      expect(notifications.length).toBe(1);
    }
  });

  test('should clear notifications correctly', () => {
    sparePart.use(10);
    const notificationEntity = SparePartNotificationEntity.create([sparePart]);
    if (notificationEntity instanceof SparePartNotificationEntity) {
      notificationEntity.checkStockLevels();
      expect(notificationEntity.getNotifications().length).toBe(1);
      notificationEntity.clearNotifications();
      expect(notificationEntity.getNotifications().length).toBe(0);
    }
  });

  test('should not add notifications for stock that is not low', () => {
    const notificationEntity = SparePartNotificationEntity.create([
      sufficientStockPart,
    ]);
    if (notificationEntity instanceof SparePartNotificationEntity) {
      notificationEntity.checkStockLevels();
      const notifications = notificationEntity.getNotifications();
      expect(notifications.length).toBe(0);
    }
  });
});
