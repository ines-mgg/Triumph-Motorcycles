import { RepairRepository } from '../RepairRepository';
import { RepairNotFoundError } from '@triumph-motorcycles/domain/errors';
import { repair } from '../../../tests/testUtils';

describe('RepairRepository', () => {
  let repairRepository: RepairRepository;

  beforeEach(() => {
    repairRepository = {
      save: jest.fn(),
      findById: jest.fn(),
      findByBreakdownId: jest.fn(),
      findByRepairDateRange: jest.fn(),
    };
  });

  it('should save a repair entity', async () => {
    await repairRepository.save(repair);
    expect(repairRepository.save).toHaveBeenCalledWith(repair);
  });

  it('should find a repair entity by id', async () => {
    (repairRepository.findById as jest.Mock).mockResolvedValue(repair);
    const result = await repairRepository.findById(repair.id);
    expect(result).toEqual(repair);
  });

  it('should return RepairNotFoundError if repair entity not found by id', async () => {
    (repairRepository.findById as jest.Mock).mockResolvedValue(
      new RepairNotFoundError(),
    );
    const result = await repairRepository.findById('1');
    expect(result).toBeInstanceOf(RepairNotFoundError);
  });

  it('should find repair entities by breakdown id', async () => {
    (repairRepository.findByBreakdownId as jest.Mock).mockResolvedValue(repair);
    const result = await repairRepository.findByBreakdownId(
      repair.breakdown.id,
    );
    expect(result).toEqual(repair);
  });

  it('should return RepairNotFoundError if no repair entities found by breakdown id', async () => {
    (repairRepository.findByBreakdownId as jest.Mock).mockResolvedValue(
      new RepairNotFoundError(),
    );
    const result = await repairRepository.findByBreakdownId('b1');
    expect(result).toBeInstanceOf(RepairNotFoundError);
  });

  it('should return RepairNotFoundError if no repair entities found by repair date range', async () => {
    (repairRepository.findByRepairDateRange as jest.Mock).mockResolvedValue(
      new RepairNotFoundError(),
    );
    const result = await repairRepository.findByRepairDateRange(
      new Date('2023-01-01'),
      new Date('2023-01-03'),
    );
    expect(result).toBeInstanceOf(RepairNotFoundError);
  });
});
