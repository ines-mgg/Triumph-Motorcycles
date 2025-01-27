import { ConcessionEntity } from './ConcessionEntity';
import { NameAlphanumericError } from '@triumph-motorcycles/domain/errors';
import { user, motorcycle } from '../../../tests/testUtils';

describe('ConcessionEntity', () => {
  describe('create', () => {
    it('should create a concession successfully', () => {
      const name = 'TestConcession1';
      const concession = ConcessionEntity.create(name, user);
      expect(concession).toBeInstanceOf(ConcessionEntity);

      if (concession instanceof ConcessionEntity) {
        expect(concession.name.value).toBe(name);
        expect(concession.user).toBe(user);
      }
    });

    it('should return error if name contains symbols', () => {
      const name = 'Test@Concession!';
      const concession = ConcessionEntity.create(name, user);
      expect(concession).toBeInstanceOf(NameAlphanumericError);
    });

    it('should return error if name length is too short', () => {
      const name = 'A';
      const concession = ConcessionEntity.create(name, user);
      expect(concession).toBeInstanceOf(Error);
    });

    it('should return error if name length is too long', () => {
      const name = 'A'.repeat(51);
      const concession = ConcessionEntity.create(name, user);
      expect(concession).toBeInstanceOf(Error);
    });
  });

  describe('updateName', () => {
    it('should update the name successfully', () => {
      const concession = ConcessionEntity.create(
        'OldName',
        user,
      ) as ConcessionEntity;
      const newName = 'NewTestConcession';
      concession.updateName(newName);
      expect(concession.name.value).toBe(newName);
    });

    it('should return error if updated name contains symbols', () => {
      const concession = ConcessionEntity.create(
        'OldName',
        user,
      ) as ConcessionEntity;
      const newName = 'NewName@!';
      const result = concession.updateName(newName);
      expect(result).toBeInstanceOf(NameAlphanumericError);
    });

    it('should return error if updated name length is too short', () => {
      const concession = ConcessionEntity.create(
        'OldName',
        user,
      ) as ConcessionEntity;
      const newName = 'A';
      const result = concession.updateName(newName);
      expect(result).toBeInstanceOf(Error);
    });

    it('should return error if updated name length is too long', () => {
      const concession = ConcessionEntity.create(
        'OldName',
        user,
      ) as ConcessionEntity;
      const newName = 'A'.repeat(51);
      const result = concession.updateName(newName);
      expect(result).toBeInstanceOf(Error);
    });
  });

  describe('motorcycle management', () => {
    it('should add a motorcycle to the concession', () => {
      const concession = ConcessionEntity.create(
        'TestConcession',
        user,
      ) as ConcessionEntity;
      concession.addMotorcycle(motorcycle);
      expect(concession.getMotorcycles()).toContain(motorcycle);
    });

    it('should remove a motorcycle from the concession', () => {
      const concession = ConcessionEntity.create(
        'TestConcession',
        user,
      ) as ConcessionEntity;
      concession.addMotorcycle(motorcycle);
      concession.removeMotorcycle(motorcycle.id);
      expect(concession.getMotorcycles()).not.toContain(motorcycle);
    });
  });

  describe('getDetails', () => {
    it('should return correct concession details', () => {
      const name = 'TestConcession';
      const concession = ConcessionEntity.create(
        name,
        user,
      ) as ConcessionEntity;
      const details = concession.getDetails();
      expect(details.identifier).toBe(concession.identifier);
      expect(details.name).toBe(name);
      expect(details.user).toBe(user);
      expect(details.motorcycles).toEqual([]);
    });
  });
});
