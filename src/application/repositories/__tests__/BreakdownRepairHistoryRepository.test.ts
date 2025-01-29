import { BreakdownRepairHistoryRepository } from '../BreakdownRepairHistoryRepository';
import { breakdown, repair } from '../../../tests/testUtils';

describe('BreakdownRepairHistoryRepository', () => {
  let breakdownRepairHistoryRepository: BreakdownRepairHistoryRepository;
  beforeEach(() => {
    breakdownRepairHistoryRepository = {
      getAllRepairs: jest.fn(),
      getRepairsByBreakdown: jest.fn(),
      saveRepair: jest.fn(),
    };
  });
  it('should save a repair', async () => {
    await breakdownRepairHistoryRepository.saveRepair(repair);
    expect(breakdownRepairHistoryRepository.saveRepair).toHaveBeenCalledWith(
      repair,
    );
  });

  it('should get all repairs', async () => {
    (
      breakdownRepairHistoryRepository.getAllRepairs as jest.Mock
    ).mockReturnValue([repair]);
    const repairs = await breakdownRepairHistoryRepository.getAllRepairs();
    expect(repairs).toEqual([repair]);
  });

  it('should get repairs by breakdown', async () => {
    (
      breakdownRepairHistoryRepository.getRepairsByBreakdown as jest.Mock
    ).mockReturnValue([repair]);
    const repairs =
      await breakdownRepairHistoryRepository.getRepairsByBreakdown(
        breakdown.id,
      );
    expect(repairs).toEqual([repair]);
  });
});
