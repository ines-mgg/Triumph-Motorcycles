import { MaintenanceType } from "@triumph-motorcycles/domain/types/MaintenanceType";
import { UnexpectedError } from "@triumph-motorcycles/domain/errors/user/UnexpectedError";
import { MaintenanceRepositoryInterface } from "@triumph-motorcycles/application/repositories/MaintenanceRepositoryInterface";


export class UpdateMaintenanceUseCase {
  constructor(private readonly maintenanceRepository: MaintenanceRepositoryInterface) {}

  public async execute(
    id: string,
    maintenanceType: MaintenanceType,
    date: Date,
    cost: number
  ): Promise<void | Error> {
    try {
      const maintenanceOrm = await this.maintenanceRepository.findById(id);

      if (maintenanceOrm instanceof Error) return maintenanceOrm;
      

      maintenanceOrm.updateDetails(maintenanceType, date, cost);

      return await this.maintenanceRepository.update(maintenanceOrm);
    } catch (error) {
      return new UnexpectedError(error instanceof Error ? error.message : String(error));
    }
  }
}
