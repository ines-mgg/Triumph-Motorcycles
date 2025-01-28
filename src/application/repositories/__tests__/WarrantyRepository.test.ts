import { WarrantyRepository } from '../WarrantyRepository';
import { WarrantyNotFoundError } from '@triumph-motorcycles/domain/errors/warranty/WarrantyNotFoundError';
import { warranty, motorcycle } from '../../../tests/testUtils';

describe('WarrantyRepository', () => {
  let warrantyRepository: WarrantyRepository;
  beforeEach(() => {
    warrantyRepository = {
      findById: jest.fn(),
      save: jest.fn(),
      findByMotorcycleId: jest.fn(),
    };
  });

  it('should save an warranty', async () => {
    await warrantyRepository.save(warranty);
    expect(warrantyRepository.save).toHaveBeenCalledWith(warranty);
  });
  it('should find an warranty by ID', async () => {
    (warrantyRepository.findById as jest.Mock).mockResolvedValue(warranty);
    const result = await warrantyRepository.findById(warranty.id);
    expect(warrantyRepository.findById).toHaveBeenCalledWith(warranty.id);
    expect(result).toBe(warranty);
  });

  it('should return an error if warranty not found by ID', async () => {
    const identifier = '123';
    (warrantyRepository.findById as jest.Mock).mockResolvedValue(
      new WarrantyNotFoundError(),
    );

    const result = await warrantyRepository.findById(identifier);
    expect(warrantyRepository.findById).toHaveBeenCalledWith(identifier);
    expect(result).toBeInstanceOf(WarrantyNotFoundError);
  });
  it('should find an warranty by motorcycle', async () => {
    (warrantyRepository.findByMotorcycleId as jest.Mock).mockResolvedValue(
      warranty,
    );
    const result = await warrantyRepository.findByMotorcycleId(motorcycle.id);
    expect(warrantyRepository.findByMotorcycleId).toHaveBeenCalledWith(
      motorcycle.id,
    );
    expect(result).toBe(warranty);
  });

  it('should return an error if warranty not found by motorcycle', async () => {
    const identifier = '123';
    (warrantyRepository.findByMotorcycleId as jest.Mock).mockResolvedValue(
      new WarrantyNotFoundError(),
    );

    const result = await warrantyRepository.findByMotorcycleId(identifier);
    expect(warrantyRepository.findByMotorcycleId).toHaveBeenCalledWith(
      identifier,
    );
    expect(result).toBeInstanceOf(WarrantyNotFoundError);
  });
});
