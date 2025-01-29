import { BreakdownRepository } from '../BreakdownRepository';
import { motorcycle, breakdown } from '../../../tests/testUtils';

describe('BreakdownRepository', () => {
  let breakdownRepository: BreakdownRepository;
  beforeEach(() => {
    breakdownRepository = {
      all: jest.fn(),
      delete: jest.fn(),
      findByMotorcycleId: jest.fn(),
      findOneById: jest.fn(),
      save: jest.fn(),
    };
  });
  it('should save a breakdown', async () => {
    await breakdownRepository.save(breakdown);
    expect(breakdownRepository.save).toHaveBeenCalledWith(breakdown);
  });
  it('should delete a breakdown', async () => {
    await breakdownRepository.delete(breakdown.id);
    expect(breakdownRepository.delete).toHaveBeenCalledWith(breakdown.id);
  });
  it('should get all breakdowns', async () => {
    (breakdownRepository.all as jest.Mock).mockReturnValue([breakdown]);
    const breakdowns = await breakdownRepository.all();
    expect(breakdowns).toEqual([breakdown]);
  });
  it('should get breakdows by motorcycle', async () => {
    (breakdownRepository.findByMotorcycleId as jest.Mock).mockReturnValue([
      breakdown,
    ]);
    const breakdowns = await breakdownRepository.findByMotorcycleId(
      motorcycle.id,
    );
    expect(breakdowns).toEqual([breakdown]);
  });

  it('should get breakdow by id', async () => {
    (breakdownRepository.findOneById as jest.Mock).mockReturnValue([breakdown]);
    const breakdowns = await breakdownRepository.findOneById(breakdown.id);
    expect(breakdowns).toEqual([breakdown]);
  });
});
