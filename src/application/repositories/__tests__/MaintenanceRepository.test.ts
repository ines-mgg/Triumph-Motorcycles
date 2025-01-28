import { MaintenanceRepository } from '../MaintenanceRepository';
import { MaintenanceNotFoundError } from '@triumph-motorcycles/domain/errors/maintenance/MaintenanceNotFoundError';
import { maintenance } from '../../../tests/testUtils';

describe('MaintenanceRepository', () => {
  let maintenanceRepository: MaintenanceRepository;
  beforeEach(() => {
    maintenanceRepository = {
      findById: jest.fn(),
      save: jest.fn(),
      findAll: jest.fn(),
      deleteById: jest.fn(),
    };
  });
  it('should save a spare part', async () => {
    await maintenanceRepository.save(maintenance);
    expect(maintenanceRepository.save).toHaveBeenCalledWith(maintenance);
  });

  it('should find an maintenance by ID', async () => {
    (maintenanceRepository.findById as jest.Mock).mockResolvedValue(
      maintenance,
    );
    const result = await maintenanceRepository.findById(maintenance.id);
    expect(maintenanceRepository.findById).toHaveBeenCalledWith(maintenance.id);
    expect(result).toBe(maintenance);
  });

  it('should return an error if maintenance not found by ID', async () => {
    const identifier = '123';
    (maintenanceRepository.findById as jest.Mock).mockResolvedValue(
      new MaintenanceNotFoundError(),
    );

    const result = await maintenanceRepository.findById(identifier);
    expect(maintenanceRepository.findById).toHaveBeenCalledWith(identifier);
    expect(result).toBeInstanceOf(MaintenanceNotFoundError);
  });
  it('should find all concessions', async () => {
    (maintenanceRepository.findAll as jest.Mock).mockResolvedValue(maintenance);
    const result = await maintenanceRepository.findAll();
    expect(result).toBe(maintenance);
  });
  it('should return an error if no maintenance', async () => {
    (maintenanceRepository.findAll as jest.Mock).mockResolvedValue(
      new MaintenanceNotFoundError(),
    );
    const result = await maintenanceRepository.findAll();
    expect(maintenanceRepository.findAll).toHaveBeenCalledWith();
    expect(result).toBeInstanceOf(MaintenanceNotFoundError);
  });
});
