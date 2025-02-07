import { AppointmentRepository } from '@triumph-motorcycles/application/repositories/AppointmentRepository';
import { CompanyRepository } from '@triumph-motorcycles/application/repositories/CompanyRepository';
import { LocationRepository } from '@triumph-motorcycles/application/repositories/LocationRepository';
import { MaintenanceRepository } from '@triumph-motorcycles/application/repositories/MaintenanceRepository';
import { MotorcycleTryRepository } from '@triumph-motorcycles/application/repositories/MotorcycleTryRepository';
import { RepairRepository } from '@triumph-motorcycles/application/repositories/RepairRepository';
import { UserRepository } from '@triumph-motorcycles/application/repositories/UserRepository';
import { AppointmentEntity } from '@triumph-motorcycles/domain/entities/appointment/AppointmentEntity';
import { LocationEntity } from '@triumph-motorcycles/domain/entities/location/LocationEntity';
import { MaintenanceEntity } from '@triumph-motorcycles/domain/entities/maintenances/MaintenanceEntity';
import { RepairEntity } from '@triumph-motorcycles/domain/entities/maintenances/RepairEntity';
import { AppointmentReason } from '@triumph-motorcycles/domain/types/AppointmentReason';
import { AppointmentStatus } from '@triumph-motorcycles/domain/types/AppointmentStatus';
import { MotorcycleTryEntity } from 'src/domain/entities/drives/MotorcycleTryEntity';

export class AppointmentCreateUseCase {
  constructor(
    private readonly repository: AppointmentRepository,
    private readonly userRepository: UserRepository,
    private readonly companyRepository: CompanyRepository,
    private readonly locationRepository: LocationRepository,
    private readonly maintenanceRepository: MaintenanceRepository,
    private readonly repairRepository: RepairRepository,
    private readonly motorcycleTrialRepository: MotorcycleTryRepository,
  ) {}

  public async createAppointment(
    userId: string,
    startTime: Date,
    endTime: Date,
    status: AppointmentStatus,
    reason: AppointmentReason,
    companyId: string,
    locationId: string | null = null,
    maintenanceId: string | null = null,
    repairId: string | null = null,
    motorcycleTrialId: string | null = null,
  ): Promise<void | Error> {
    const user = await this.userRepository.findOne(userId);
    if (user instanceof Error) return user;

    const company = await this.companyRepository.findById(companyId);
    if (company instanceof Error) return company;

    let location: LocationEntity | Error | null = null;
    if (locationId) {
      location = await this.locationRepository.findById(locationId);
      if (location instanceof Error) return location;
    }

    let repair: RepairEntity | Error | null = null;
    if (repairId) {
      repair = await this.repairRepository.findById(repairId);
      if (repair instanceof Error) return repair;
    }

    let maintenance: MaintenanceEntity | Error | null = null;
    if (maintenanceId) {
      maintenance = await this.maintenanceRepository.findById(maintenanceId);
      if (maintenance instanceof Error) return maintenance;
    }

    let motorcycleTrial: MotorcycleTryEntity | Error | null = null;
    if (motorcycleTrialId) {
      motorcycleTrial = await this.motorcycleTrialRepository.findById(
        motorcycleTrialId,
      );
      if (motorcycleTrial instanceof Error) return motorcycleTrial;
    }

    const appointment = AppointmentEntity.create(
      null,
      user,
      startTime,
      endTime,
      status,
      new Date(),
      new Date(),
      reason,
      company,
      location as LocationEntity,
      maintenance as MaintenanceEntity,
      repair as RepairEntity,
      motorcycleTrial as MotorcycleTryEntity,
    );

    if (appointment instanceof Error) return appointment;
    await this.repository.save(appointment);
  }
}
