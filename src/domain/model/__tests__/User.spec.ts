import { User } from './index.js';

const validUser: User = {
  id: 'validUser',
  firstname: 'valid',
  lastname: 'user',
  email: 'validuser@test.com',
  password: 'validUser',
  role: 'ADMIN',
};

describe('testing User interface', () => {
  describe('for validUser', () => {
    test('user is defined', () => {
      expect(validUser).toBeDefined();
    });
    test('user has right role', () => {
      expect(['ADMIN', 'USER']).toContain(validUser.role);
    });
  });
});
