import { SparePartNotificationEntity } from '../SparePartNotificationEntity';
import { SparePartEntity } from '../SparePartEntity';

describe('SparePartNotificationEntity', () => {
  let sparePart: SparePartEntity;
  const name = 'Spare Part 1';
  const quantityInStock = 20;
  const criticalLevel = 20;
  const cost = 50;

  beforeEach(() => {
    sparePart = SparePartEntity.create(name, quantityInStock, criticalLevel, cost) as SparePartEntity;
  });

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
    const sufficientStockPart = SparePartEntity.create('Spare Part 2', 100, 50, 100) as SparePartEntity;
    const notificationEntity = SparePartNotificationEntity.create([sufficientStockPart]);
    if (notificationEntity instanceof SparePartNotificationEntity) {
      notificationEntity.checkStockLevels();
      const notifications = notificationEntity.getNotifications();
      expect(notifications.length).toBe(0);
    }
  });
});
