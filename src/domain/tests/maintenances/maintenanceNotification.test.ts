/// <reference types="jest" />

import { MaintenanceNotification } from "../../entities/maintenances/maintenanceNotification";


describe('MaintenanceNotification', () => {
  let notification: MaintenanceNotification;

  beforeEach(() => {
    notification = new MaintenanceNotification(
      'recipient123',
      'Your motorcycle service is due soon.',
      new Date('2023-10-29'),
      'ServiceReminder',
    );
  });

  describe('constructeur', () => {
    it("devrait initialiser une notification avec les propriétés correctes", () => {
      expect(notification.recipientId).toBe('recipient123');
      expect(notification.message).toBe('Your motorcycle service is due soon.');
      expect(notification.date).toEqual(new Date('2023-10-29'));
      expect(notification.type).toBe('ServiceReminder');
      expect(notification.isRead).toBe(false);
    });
  });

  describe('markAsRead', () => {
    it("devrait marquer la notification comme lue", () => {
      notification.markAsRead();
      expect(notification.isRead).toBe(true);
    });

    it("devrait rester marquée comme lue après l'avoir appelée plusieurs fois", () => {
      notification.markAsRead();
      notification.markAsRead();
      expect(notification.isRead).toBe(true);
    });
  });
});
