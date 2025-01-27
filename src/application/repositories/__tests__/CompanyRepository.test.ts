import { CompanyRepository } from '../CompanyRepository';
import { company } from '../../../tests/testUtils';

describe('CompanyRepository', () => {
  let companyRepository: CompanyRepository;
  beforeEach(() => {
    companyRepository = {
      findById: jest.fn(),
      findByName: jest.fn(),
      save: jest.fn(),
      update: jest.fn(),
    };
  });
  it('should save a company', async () => {
    await companyRepository.save(company);
    expect(companyRepository.save).toHaveBeenCalledWith(company);
  });
  it('should update a company', async () => {
    await companyRepository.update(company);
    expect(companyRepository.update).toHaveBeenCalledWith(company);
  });
  it('should get company by name', async () => {
    (companyRepository.findByName as jest.Mock).mockReturnValue([company]);
    const breakdowns = await companyRepository.findByName(company.name.value);
    expect(breakdowns).toEqual([company]);
  });
  it('should get company by id', async () => {
    (companyRepository.findById as jest.Mock).mockReturnValue([company]);
    const breakdowns = await companyRepository.findById(company.identifier);
    expect(breakdowns).toEqual([company]);
  });
});
