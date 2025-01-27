import { Password, Username } from '@triumph-motorcycles/domain/values';
import {
  AppointmentReason,
  CommonRepairAction,
  MotorStatus,
} from '@triumph-motorcycles/domain/types';
import {
  AppointmentEntity,
  UserEntity,
  LocationEntity,
  MotorcycleEntity,
  BreakdownEntity,
  DriverEntity,
  MaintenanceEntity,
  RepairEntity,
  SparePartEntity,
  CompanyEntity,
  ConcessionEntity,
  WarrantyEntity,
  SparePartNotificationEntity,
  OrderEntity,
  OrderItemEntity,
  MotorcycleTryEntity,
} from '@triumph-motorcycles/domain/entities';

export const now = new Date();
export const tomorrow = new Date(now.getTime() + 24 * 60 * 60 * 1000);

export const username = Username.from('validUsername') as Username;
export const password = Password.from('Valid@123') as Password;

export const user = UserEntity.create(
  username.value,
  password.value,
  now,
  now,
) as UserEntity;
export const motorcycle = MotorcycleEntity.create(
  'Yamaha',
  'MT-09',
  2023,
  new Date('2023-01-01'),
  'Available' as MotorStatus,
) as MotorcycleEntity;
export const location = LocationEntity.create(
  motorcycle,
  user,
  now,
  100,
) as LocationEntity;
export const maintenance = MaintenanceEntity.create(
  motorcycle,
  5000,
  180,
) as MaintenanceEntity;
export const appointmentReason: AppointmentReason = {
  type: 'Location',
  entity: location,
};
export const appointment = AppointmentEntity.create(
  user,
  now,
  tomorrow,
  appointmentReason,
  null,
) as AppointmentEntity;
export const breakdown = BreakdownEntity.create(
  motorcycle,
  'Engine failure',
  new Date(Date.now() - 1000 * 60 * 60 * 24),
  null,
) as BreakdownEntity;

export const driver = DriverEntity.create(
  'John Doe',
  'A',
  'AB12345678',
  5,
  'john.doe@example.com',
  '1234567890',
) as DriverEntity;
export const repair = RepairEntity.create(
  breakdown,
  new Date(Date.now() + 1000 * 60 * 60 * 24),
  ['Oil Change', 'Brake Replacement'] as CommonRepairAction[],
  500,
) as RepairEntity;

export const sparePart = SparePartEntity.create(
  'Spare Part 1',
  20,
  20,
  50,
) as SparePartEntity;
export const sufficientStockPart = SparePartEntity.create(
  'Spare Part 2',
  100,
  50,
  100,
) as SparePartEntity;
export const company = CompanyEntity.create(
  'ValidCompany',
  user,
) as CompanyEntity;
export const concession = ConcessionEntity.create(
  'TestConcession1',
  user,
) as ConcessionEntity;
export const warranty = WarrantyEntity.create(
  motorcycle,
  now,
  new Date('2025-02-01'),
  'Engine and transmission coverage',
  true,
) as WarrantyEntity;
export const notificationEntity = SparePartNotificationEntity.create([
  sparePart,
]) as SparePartNotificationEntity;
export const order = OrderEntity.create(now, tomorrow) as OrderEntity;
export const orderItem = OrderItemEntity.create(
  sparePart,
  -1,
  20,
) as OrderItemEntity;
export const motorcycleTry = MotorcycleTryEntity.create(
  motorcycle,
  driver,
  now,
  tomorrow,
) as MotorcycleTryEntity;
