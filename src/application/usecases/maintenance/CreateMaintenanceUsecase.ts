import { MaintenanceRepositoryInterface } from '@triumph-motorcycles/application/repositories/MaintenanceRepositoryInterface';
import { MotorcycleRepositoryInterface } from '@triumph-motorcycles/application/repositories/MotorcycleRepositoryInterface';
import { ConcessionRepositoryInterface } from '@triumph-motorcycles/application/repositories/ConcessionRepositoryInterface';
import { MaintenanceEntity } from '@triumph-motorcycles/domain/entities/maintenance/MaintenanceEntity';
import { MaintenanceType } from '@triumph-motorcycles/domain/types/MaintenanceType';
import { MotorcycleNotFoundError } from '@triumph-motorcycles/domain/errors/motorcycle/MotorcycleNotFoundError';

export class CreateMaintenanceUsecase {
  constructor(
    private readonly maintenanceRepository: MaintenanceRepositoryInterface,
    private readonly motorcycleRepository: MotorcycleRepositoryInterface,
    private readonly concessionRepository: ConcessionRepositoryInterface,
  ) {}

  async execute(
    motorcycleId: string,
    maintenanceType: MaintenanceType,
    date: Date,
    cost: number,
    mileageAtService: number,
    maintenanceIntervalMileage: number,
    maintenanceIntervalTime: number,
    concessionId: string | null,
  ): Promise<void | Error> {
    const motorcycle = await this.motorcycleRepository.findById(motorcycleId);

    if (motorcycle instanceof Error)
      return new MotorcycleNotFoundError(
        `Motorcycle with ID ${motorcycleId} not found`,
      );

    const concession = await this.concessionRepository.findById(concessionId);
    if (concession instanceof Error) return concession;

    const maintenance = MaintenanceEntity.create(
      null,
      motorcycle,
      maintenanceType,
      date,
      cost,
      mileageAtService,
      maintenanceIntervalMileage,
      maintenanceIntervalTime,
      concession,
    );
    if (maintenance instanceof Error) return maintenance;

    await this.maintenanceRepository.save(maintenance);
  }
}
