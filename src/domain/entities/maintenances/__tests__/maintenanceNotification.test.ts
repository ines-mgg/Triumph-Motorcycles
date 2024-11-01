/// <reference types="jest" />

import { MaintenanceNotification } from '../maintenanceNotification';
import { InvalidNotificationError } from '../../../errors/maintenances';

describe('MaintenanceNotification', () => {
  let notification: MaintenanceNotification;

  beforeEach(() => {
    notification = new MaintenanceNotification(
      'recipient1',
      'Ceci est une notification de test',
      new Date('2024-01-01'),
      'ServiceReminder',
    );
  });

  describe('Constructeur', () => {
    it('devrait créer une notification valide', () => {
      expect(notification.recipientId).toBe('recipient1');
      expect(notification.message).toBe('Ceci est une notification de test');
      expect(notification.date).toEqual(new Date('2024-01-01'));
      expect(notification.type).toBe('ServiceReminder');
      expect(notification.isRead).toBe(false);
    });

    it('devrait lancer une erreur pour un recipientId vide', () => {
      expect(() => {
        new MaintenanceNotification(
          '',
          'Un message',
          new Date(),
          'ServiceReminder',
        );
      }).toThrow(InvalidNotificationError);
    });

    it('devrait lancer une erreur pour un message vide', () => {
      expect(() => {
        new MaintenanceNotification(
          'recipient1',
          '',
          new Date(),
          'ServiceReminder',
        );
      }).toThrow(InvalidNotificationError);
    });

    it('devrait lancer une erreur pour une date invalide', () => {
      expect(() => {
         
        new MaintenanceNotification(
          'recipient1',
          'Un message',
          <any>'date invalide',
          'ServiceReminder',
        );
      }).toThrow(InvalidNotificationError);
    });

    it('devrait lancer une erreur pour un type de notification invalide', () => {
      expect(() => {
         
        new MaintenanceNotification(
          'recipient1',
          'Un message',
          new Date(),
          'TypeInvalide' as any,
        );
      }).toThrow(InvalidNotificationError);
    });
  });

  describe('markAsRead', () => {
    it('devrait marquer la notification comme lue', () => {
      notification.markAsRead();
      expect(notification.isRead).toBe(true);
    });
  });

  describe('changeType', () => {
    it('devrait changer le type de notification en un type valide', () => {
      notification.changeType('StockAlert');
      expect(notification.type).toBe('StockAlert');
    });

    it('devrait lancer une erreur pour un type de notification invalide', () => {
      expect(() => {
         
        notification.changeType('TypeInvalide' as any);
      }).toThrow(InvalidNotificationError);
    });
  });
});
