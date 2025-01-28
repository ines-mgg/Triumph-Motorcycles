import { MotorcycleRepository } from '../MotorcycleRepository';
import { MotorcycleNotFoundError } from '@triumph-motorcycles/domain/errors/motorcycle/MotorcycleNotFoundError';
import { motorcycle } from '../../../tests/testUtils';

describe('MotorcycleRepository', () => {
  let repository: MotorcycleRepository;

  beforeEach(() => {
    repository = {
      save: jest.fn(),
      all: jest.fn(),
      findOneById: jest.fn(),
      delete: jest.fn(),
      update: jest.fn(),
    };
  });

  it('should save a motorcycle', async () => {
    await repository.save(motorcycle);
    expect(repository.save).toHaveBeenCalledWith(motorcycle);
  });

  it('should return all motorcycles', async () => {
    const motorcycles = [motorcycle];
    (repository.all as jest.Mock).mockResolvedValue(motorcycles);

    const result = await repository.all();
    expect(result).toEqual(motorcycles);
  });

  it('should return MotorcycleNotFoundError if no motorcycles found', async () => {
    (repository.all as jest.Mock).mockResolvedValue(
      new MotorcycleNotFoundError(),
    );

    const result = await repository.all();
    expect(result).toBeInstanceOf(MotorcycleNotFoundError);
  });

  it('should find a motorcycle by id', async () => {
    (repository.findOneById as jest.Mock).mockResolvedValue(motorcycle);

    const result = await repository.findOneById(motorcycle.id);
    expect(result).toEqual(motorcycle);
  });

  it('should return MotorcycleNotFoundError if motorcycle not found by id', async () => {
    (repository.findOneById as jest.Mock).mockResolvedValue(
      new MotorcycleNotFoundError(),
    );

    const result = await repository.findOneById('invalid-id');
    expect(result).toBeInstanceOf(MotorcycleNotFoundError);
  });

  it('should delete a motorcycle by id', async () => {
    await repository.delete(motorcycle.id);
    expect(repository.delete).toHaveBeenCalledWith(motorcycle.id);
  });

  it('should update a motorcycle', async () => {
    await repository.update(motorcycle);
    expect(repository.update).toHaveBeenCalledWith(motorcycle);
  });
});
