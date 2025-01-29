import { Password } from '@triumph-motorcycles/domain/values/user/Password';
import { Username } from '@triumph-motorcycles/domain/values/user/Username';
import { AppointmentEntity } from '@triumph-motorcycles//domain/entities/appointment/AppointmentEntity';
import { CompanyEntity } from '@triumph-motorcycles//domain/entities/company/CompanyEntity';
import { ConcessionEntity } from '@triumph-motorcycles//domain/entities/concession/ConcessionEntity';
import { DriverEntity } from '@triumph-motorcycles//domain/entities/drives/DriverEntity';
import { MotorcycleEntity } from '@triumph-motorcycles//domain/entities/drives/MotorcycleEntity';
import { MotorcycleTryEntity } from '@triumph-motorcycles//domain/entities/drives/MotorcycleTryEntity';
import { LocationEntity } from '@triumph-motorcycles//domain/entities/location/LocationEntity';
import { BreakdownEntity } from '@triumph-motorcycles//domain/entities/maintenances/BreakdownEntity';
import { MaintenanceEntity } from '@triumph-motorcycles//domain/entities/maintenances/MaintenanceEntity';
import { RepairEntity } from '@triumph-motorcycles//domain/entities/maintenances/RepairEntity';
import { WarrantyEntity } from '@triumph-motorcycles//domain/entities/maintenances/WarrantyEntity';
import { OrderEntity } from '@triumph-motorcycles//domain/entities/parts/OrderEntity';
import { OrderItemEntity } from '@triumph-motorcycles//domain/entities/parts/OrderItemEntity';
import { SparePartEntity } from '@triumph-motorcycles//domain/entities/parts/SparePartEntity';
import { SparePartNotificationEntity } from '@triumph-motorcycles//domain/entities/parts/SparePartNotificationEntity';
import { UserEntity } from '@triumph-motorcycles//domain/entities/user/UserEntity';
import { AppointmentReason } from '@triumph-motorcycles//domain/types/AppointmentReason';
import {
  MotorStatus,
  CommonRepairAction,
} from '@triumph-motorcycles//domain/types/motorcycle';

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
  now,
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
