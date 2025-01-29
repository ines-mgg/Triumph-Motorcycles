import { MotorcycleTryNotFoundError } from '@triumph-motorcycles/domain/errors/motorcycleTry/MotorcycleTestNotFoundError';
import { motorcycleTry } from '../../../tests/testUtils';
import { MotorcycleTryRepository } from '../MotorcycleTryRepository';

describe('MotorcycleTryRepository', () => {
  let repository: MotorcycleTryRepository;

  beforeEach(() => {
    repository = {
      save: jest.fn(),
      findOneById: jest.fn(),
      delete: jest.fn(),
      all: jest.fn(),
    };
  });

  it('should save a motorcycle try', async () => {
    await repository.save(motorcycleTry);
    expect(repository.save).toHaveBeenCalledWith(motorcycleTry);
  });

  it('should find a motorcycle try by id', async () => {
    (repository.findOneById as jest.Mock).mockResolvedValue(motorcycleTry);
    const result = await repository.findOneById(motorcycleTry.id);
    expect(result).toEqual(motorcycleTry);
    expect(repository.findOneById).toHaveBeenCalledWith(motorcycleTry.id);
  });

  it('should return MotorcycleTryNotFoundError if motorcycle try not found', async () => {
    (repository.findOneById as jest.Mock).mockResolvedValue(
      new MotorcycleTryNotFoundError(),
    );
    const result = await repository.findOneById('non-existent-id');
    expect(result).toBeInstanceOf(MotorcycleTryNotFoundError);
    expect(repository.findOneById).toHaveBeenCalledWith('non-existent-id');
  });

  it('should delete a motorcycle try by id', async () => {
    const id = 'some-id';
    await repository.delete(id);
    expect(repository.delete).toHaveBeenCalledWith(id);
  });

  it('should return all motorcycle tries', async () => {
    (repository.all as jest.Mock).mockResolvedValue(motorcycleTry);
    const result = await repository.all();
    expect(result).toEqual(motorcycleTry);
    expect(repository.all).toHaveBeenCalled();
  });

  it('should return MotorcycleTryNotFoundError if no motorcycle tries found', async () => {
    (repository.all as jest.Mock).mockResolvedValue(
      new MotorcycleTryNotFoundError(),
    );
    const result = await repository.all();
    expect(result).toBeInstanceOf(MotorcycleTryNotFoundError);
    expect(repository.all).toHaveBeenCalled();
  });
});
