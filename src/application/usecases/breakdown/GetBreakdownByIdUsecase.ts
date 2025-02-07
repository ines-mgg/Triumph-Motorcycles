import { BreakdownRepositoryInterface } from '@triumph-motorcycles/application/repositories/BreakdownRepositoryInterface';
import { BreakdownEntity } from '@triumph-motorcycles/domain/entities/breakdown/BreakdownEntity';

export class GetBreakdownsByMotorcycleIdUsecase {
  constructor(
    private readonly breakdownRepository: BreakdownRepositoryInterface,
  ) {}

  public async execute(
    motorcycleId: string,
  ): Promise<BreakdownEntity[] | Error> {
    return await this.breakdownRepository.findByMotorcycleId(motorcycleId);
  }
}
