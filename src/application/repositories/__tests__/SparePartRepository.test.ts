import { SparePartRepository } from '../SparePartRepository';
import { SparePartNotFoundError } from '@triumph-motorcycles/domain/errors';
import { sparePart } from '../../../tests/testUtils';

describe('SparePartRepository', () => {
  let sparePartRepository: SparePartRepository;
  beforeEach(() => {
    sparePartRepository = {
      findById: jest.fn(),
      save: jest.fn(),
      findAll: jest.fn(),
    };
  });
  it('should save a spare part', async () => {
    await sparePartRepository.save(sparePart);
    expect(sparePartRepository.save).toHaveBeenCalledWith(sparePart);
  });

  it('should find an sparePart by ID', async () => {
    (sparePartRepository.findById as jest.Mock).mockResolvedValue(sparePart);
    const result = await sparePartRepository.findById(sparePart.id);
    expect(sparePartRepository.findById).toHaveBeenCalledWith(sparePart.id);
    expect(result).toBe(sparePart);
  });

  it('should return an error if sparePart not found by ID', async () => {
    const identifier = '123';
    (sparePartRepository.findById as jest.Mock).mockResolvedValue(
      new SparePartNotFoundError(),
    );

    const result = await sparePartRepository.findById(identifier);
    expect(sparePartRepository.findById).toHaveBeenCalledWith(identifier);
    expect(result).toBeInstanceOf(SparePartNotFoundError);
  });
  it('should find all concessions', async () => {
    (sparePartRepository.findAll as jest.Mock).mockResolvedValue(sparePart);
    const result = await sparePartRepository.findAll();
    expect(result).toBe(sparePart);
  });
  it('should return an error if no sparePart', async () => {
    (sparePartRepository.findAll as jest.Mock).mockResolvedValue(
      new SparePartNotFoundError(),
    );
    const result = await sparePartRepository.findAll();
    expect(sparePartRepository.findAll).toHaveBeenCalledWith();
    expect(result).toBeInstanceOf(SparePartNotFoundError);
  });
});
