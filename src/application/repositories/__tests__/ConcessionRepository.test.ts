import { ConcessionRepository } from '../ConcessionRepository';
import { ConcessionNotFoundError } from '@triumph-motorcycles/domain/errors/concession/ConcessionNotFoundError';
import { concession } from '../../../tests/testUtils';

describe('ConcessionRepository', () => {
  let concessionRepository: ConcessionRepository;
  beforeEach(() => {
    concessionRepository = {
      findById: jest.fn(),
      save: jest.fn(),
      update: jest.fn(),
      findAll: jest.fn(),
      remove: jest.fn(),
    };
  });
  it('should save an concession', async () => {
    await concessionRepository.save(concession);
    expect(concessionRepository.save).toHaveBeenCalledWith(concession);
  });
  it('should find an concession by ID', async () => {
    (concessionRepository.findById as jest.Mock).mockResolvedValue(concession);
    const result = await concessionRepository.findById(concession.identifier);
    expect(concessionRepository.findById).toHaveBeenCalledWith(
      concession.identifier,
    );
    expect(result).toBe(concession);
  });

  it('should return an error if concession not found by ID', async () => {
    const identifier = '123';
    (concessionRepository.findById as jest.Mock).mockResolvedValue(
      new ConcessionNotFoundError(),
    );

    const result = await concessionRepository.findById(identifier);
    expect(concessionRepository.findById).toHaveBeenCalledWith(identifier);
    expect(result).toBeInstanceOf(ConcessionNotFoundError);
  });
  it('should find all concessions', async () => {
    (concessionRepository.findAll as jest.Mock).mockResolvedValue(concession);
    const result = await concessionRepository.findAll();
    expect(result).toBe(concession);
  });
  it('should update an concession', async () => {
    await concessionRepository.update(concession);
    expect(concessionRepository.update).toHaveBeenCalledWith(concession);
  });

  it('should delete an concession by ID', async () => {
    await concessionRepository.remove(concession.identifier);
    expect(concessionRepository.remove).toHaveBeenCalledWith(
      concession.identifier,
    );
  });
});
