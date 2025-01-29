import { UserRepository } from '../UserRepository';
import { UserNotFoundError } from '@triumph-motorcycles/domain/errors/user/UserNotFoundError';
import { user } from '../../../tests/testUtils';

describe('UserRepository', () => {
  let userRepository: UserRepository;
  beforeEach(() => {
    userRepository = {
      findById: jest.fn(),
      findByUsername: jest.fn(),
      save: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    };
  });
  it('should save an user', async () => {
    await userRepository.save(user);
    expect(userRepository.save).toHaveBeenCalledWith(user);
  });
  it('should find an user by ID', async () => {
    (userRepository.findById as jest.Mock).mockResolvedValue(user);
    const result = await userRepository.findById(user.identifier);
    expect(userRepository.findById).toHaveBeenCalledWith(user.identifier);
    expect(result).toBe(user);
  });

  it('should return an error if user not found by ID', async () => {
    const identifier = '123';
    (userRepository.findById as jest.Mock).mockResolvedValue(
      new UserNotFoundError(),
    );

    const result = await userRepository.findById(identifier);
    expect(userRepository.findById).toHaveBeenCalledWith(identifier);
    expect(result).toBeInstanceOf(UserNotFoundError);
  });
  it('should find an user by name', async () => {
    (userRepository.findByUsername as jest.Mock).mockResolvedValue(user);
    const result = await userRepository.findByUsername(user.username.value);
    expect(userRepository.findByUsername).toHaveBeenCalledWith(
      user.username.value,
    );
    expect(result).toBe(user);
  });

  it('should return an error if user not found by name', async () => {
    const identifier = '123';
    (userRepository.findByUsername as jest.Mock).mockResolvedValue(
      new UserNotFoundError(),
    );

    const result = await userRepository.findByUsername(identifier);
    expect(userRepository.findByUsername).toHaveBeenCalledWith(identifier);
    expect(result).toBeInstanceOf(UserNotFoundError);
  });
  it('should update an user', async () => {
    await userRepository.update(user);
    expect(userRepository.update).toHaveBeenCalledWith(user);
  });

  it('should delete an user by ID', async () => {
    await userRepository.delete(user.identifier);
    expect(userRepository.delete).toHaveBeenCalledWith(user.identifier);
  });
});
