import { DriverRepository } from '../DriverRepository';
import { DriverNotFoundError } from '@triumph-motorcycles/domain/errors';
import { driver, user } from '../../../tests/testUtils';

describe('DriverRepository', () => {
  let driverRepository: DriverRepository;
  beforeEach(() => {
    driverRepository = {
      save: jest.fn(),
      findOneById: jest.fn(),
      findAllByUser: jest.fn(),
      delete: jest.fn(),
      all: jest.fn(),
    };
  });
  it('should save an driver', async () => {
    await driverRepository.save(driver);
    expect(driverRepository.save).toHaveBeenCalledWith(driver);
  });
  it('should find an driver by ID', async () => {
    (driverRepository.findOneById as jest.Mock).mockResolvedValue(driver);
    const result = await driverRepository.findOneById(driver.driverId);
    expect(driverRepository.findOneById).toHaveBeenCalledWith(driver.driverId);
    expect(result).toBe(driver);
  });

  it('should return an error if driver not found by ID', async () => {
    const driverId = '123';
    (driverRepository.findOneById as jest.Mock).mockResolvedValue(
      new DriverNotFoundError(),
    );

    const result = await driverRepository.findOneById(driverId);
    expect(driverRepository.findOneById).toHaveBeenCalledWith(driverId);
    expect(result).toBeInstanceOf(DriverNotFoundError);
  });
  it('should find all drivers', async () => {
    (driverRepository.all as jest.Mock).mockResolvedValue(driver);
    const result = await driverRepository.all();
    expect(result).toBe(driver);
  });

  it('should find all drivers by user', async () => {
    (driverRepository.findAllByUser as jest.Mock).mockResolvedValue(driver);
    const result = await driverRepository.findAllByUser(user.identifier);
    expect(result).toBe(driver);
  });
  it('should delete an driver by ID', async () => {
    await driverRepository.delete(driver.driverId);
    expect(driverRepository.delete).toHaveBeenCalledWith(driver.driverId);
  });
});
