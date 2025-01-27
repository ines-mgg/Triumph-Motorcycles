import { AppointmentNotFoundError } from './appointment/AppointmentNotFoundError';
import { InvalidNoteError } from './appointment/InvalidNoteError';
import { InvalidTimeRangeError } from './appointment/InvalidTimeRangeError';
import { BreakdownDescriptionError } from './breakdown/BreakdownDescriptionError';
import { BreakdownInvalidWarrantyError } from './breakdown/BreakdownInvalidWarrantyError';
import { BreakdownNotFoundError } from './breakdown/BreakdownNotFoundError';
import { BreakdownReportedDateError } from './breakdown/BreakdownReportedDateError';
import { CompanyNotFoundError } from './company/CompanyNotFoundError';
import { NameAlphanumericError } from './company/NameAlphanumericError';
import { NameLengthError } from './company/NameLengthError';
import { ConcessionNotFoundError } from './concession/ConcessionNotFoundError';
import { NameAlphanumericError as ConcessionNameAlphanumericError } from './concession/NameAlphanumericError';
import { NameLengthError as ConcessionNameLengthError } from './concession/NameLengthError';
import { DriverNameError } from './driver/DriverNameError';
import { DriverNotFoundError } from './driver/DriverNotFoundError';
import { CancelLocationError } from './location/CancelLocationError';
import { EndDateError } from './location/EndDateError';
import { EndLocationError } from './location/EndLocationError';
import { LocationNotFoundError } from './location/LocationNotFoundError';
import { StartDateError } from './location/StartDateError';
import { MaintenanceCostNegativeError } from './maintenance/MaintenanceCostNegativeError';
import { MaintenanceHistoryNotFoundError } from './maintenance/MaintenanceHistoryNotFoundError';
import { MaintenanceIdOrMotorcycleIdError } from './maintenance/MaintenanceIdOrMotorcycleIdError';
import { MaintenanceIntervalMileageError } from './maintenance/MaintenanceIntervalMileageError';
import { MaintenanceIntervalTimeError } from './maintenance/MaintenanceIntervalTime';
import { MaintenanceNotFoundError } from './maintenance/MaintenanceNotFoundError';
import { MaintenanceNotificationDateError } from './maintenance/MaintenanceNotificationDateError';
import { MaintenanceNotificationMessageError } from './maintenance/MaintenanceNotificationMessageError';
import { MaintenanceNotificationNotFoundError } from './maintenance/MaintenanceNotificationNotFoundError';
import { MaintenancePartsTypeError } from './maintenance/MaintenancePartsTypeError';
import { InvalidLicenseError } from './motorcycle/InvalidLicenseError';
import { MotorcycleBrandError } from './motorcycle/MotorcycleBrandError';
import { MotorcycleYearError } from './motorcycle/MotorcycleYearError';
import { MotorcycleUpdateServiceDetailsError } from './motorcycle/MotorcycleUpdateServiceDetailsError';
import { MotorcycleStatusError } from './motorcycle/MotorcycleStatusError';
import { MotorcycleNotFoundError } from './motorcycle/MotorcycleNotFoundError';
import { MotorcycleModelError } from './motorcycle/MotorcycleModelError';
import { MotorcycleMileageError } from './motorcycle/MotorcycleMileageError';
import { WarrantyStartDateError } from './warranty/WarrantyStartDateError';
import { WarrantyNotFoundError } from './warranty/WarrantyNotFoundError';
import { WarrantyEndDateError } from './warranty/WarrantyEndDateError';
import { WarrantyCoverageDetailsError } from './warranty/WarrantyCoverageDetailsError';
import { UserNotFoundError } from './user/UserNotFoundError';
import { UsernameTooShortError } from './user/UsernameTooShortError';
import { UserAlreadyExistsError } from './user/UserAlreadyExistsError';
import { UnexpectedError } from './user/UnexpectedError';
import { UnauthorizedError } from './user/UnauthorizedError';
import { PasswordTooShortError } from './user/PasswordTooShortError';
import { PasswordDoesNotIncludeUppercaseLetterError } from './user/PasswordDoesNotIncludeUppercaseLetterError';
import { PasswordDoesNotIncludeSymbolError } from './user/PasswordDoesNotIncludeSymbolError';
import { PasswordDoesNotIncludeNumberError } from './user/PasswordDoesNotIncludeNumberError';
import { PasswordDoesNotIncludeLowercaseLetterError } from './user/PasswordDoesNotIncludeLowercaseLetterError';
import { CreateUserError } from './user/CreateUserError';
import { SparePartQuantityInStockError } from './sparePart/SparePartQuantityInStockError';
import { SparePartOrderHistoryNotFoundError } from './sparePart/SparePartOrderHistoryNotFoundError';
import { SparePartNotificationNotFoundError } from './sparePart/SparePartNotificationNotFoundError';
import { SparePartNotFoundError } from './sparePart/SparePartNotFoundError';
import { SparePartNameError } from './sparePart/SparePartNameError';
import { SparePartHistoryRecordNotFoundError } from './sparePart/SparePartHistoryRecordNotFoundError';
import { SparePartCriticalLevelError } from './sparePart/SparePartCriticalLevelError';
import { SparePartCostError } from './sparePart/SparePartCostError';
import { OrderCreateOrderItemError } from './order/OrderCreateOrderItemError';
import { RepairNotFoundError } from './repair/RepairNotFoundError';
import { RepairDateError } from './repair/RepairDateError';
import { RepairCostError } from './repair/RepairCostError';
import { OrderItemQuantityOrderedError } from './orderItem/OrderItemQuantityOrderedError';
import { OrderItemQuantityExceedError } from './orderItem/OrderItemQuantityExceedError';
import { OrderItemNotFoundError } from './orderItem/OrderItemNotFoundError';
import { OrderItemDeliveredQuantityError } from './orderItem/OrderItemDeliveredQuantityError';
import { OrderItemCostPerUnitError } from './orderItem/OrderItemCostPerUnitError';
import { OrderSparePartQuantityError } from './order/OrderSparePartQuantityError';
import { OrderSparePartNullError } from './order/OrderSparePartNullError';
import { OrderSparePartCostPerUnitError } from './order/OrderSparePartCostPerUnitError';
import { OrderNotFoundError } from './order/OrderNotFoundError';
import { OrderDateError } from './order/OrderDateError';
import { EstimatedDeliveryDateError } from './order/EstimatedDeliveryDateError';
import { MotorcycleTryStartDateError } from './motorcycleTry/MotorcycleTryStartDateError';
import { MotorcycleTryEndDateError } from './motorcycleTry/MotorcycleTryEndDateError';
import { MotorcycleTryNotFoundError } from './motorcycleTry/MotorcycleTestNotFoundError';

import {
  DriverError,
  ContactInfoError,
  DriverEmailError,
  DriverPhoneError,
  DrivingRecordError,
  ExperienceError,
  InvalidLicenseError as InvalidLicenseErrorDrivers,
  InvalidTestIDError,
  MileageError,
  MissingDriverError,
  MissingMotorcycleError as MissingMotorcycleErrorDrivers,
  NegativeMileageError,
  NegativeNextServiceMileageError,
  ServiceDetailsError,
  TestEndDateError as TestEndDateErrorDrivers,
} from './drivers';
import {
  IncompleteRepairError,
  InvalidBreakdownError,
  InvalidMaintenanceIntervalError,
  InvalidMaintenanceRecordError,
  InvalidNotificationError,
  InvalidRepairActionError,
  InvalidWarrantyError,
  MaintenanceRecordNotFoundError,
  MissingMotorcycleError,
} from './maintenances';
import {
  DeliveryError,
  InsufficientStockError,
  InvalidOrderError,
  InvalidQuantityError,
  InvalidSparePartError,
  InvalidWarrantyError as InvalidWarrantyErrorParts,
} from './parts';

export {
  AppointmentNotFoundError,
  BreakdownDescriptionError,
  BreakdownInvalidWarrantyError,
  BreakdownNotFoundError,
  BreakdownReportedDateError,
  CancelLocationError,
  CompanyNotFoundError,
  ConcessionNameAlphanumericError,
  ConcessionNameLengthError,
  ConcessionNotFoundError,
  DriverNameError,
  DriverNotFoundError,
  EndDateError,
  EndLocationError,
  InvalidLicenseError,
  InvalidNoteError,
  InvalidTimeRangeError,
  LocationNotFoundError,
  MaintenanceCostNegativeError,
  MaintenanceHistoryNotFoundError,
  MaintenanceIdOrMotorcycleIdError,
  MaintenanceIntervalMileageError,
  MaintenanceIntervalTimeError,
  MaintenanceNotFoundError,
  MaintenanceNotificationDateError,
  MaintenanceNotificationMessageError,
  MaintenanceNotificationNotFoundError,
  MaintenancePartsTypeError,
  MotorcycleBrandError,
  MotorcycleYearError,
  MotorcycleUpdateServiceDetailsError,
  MotorcycleStatusError,
  MotorcycleNotFoundError,
  MotorcycleModelError,
  MotorcycleMileageError,
  NameAlphanumericError,
  NameLengthError,
  PasswordTooShortError,
  PasswordDoesNotIncludeUppercaseLetterError,
  PasswordDoesNotIncludeSymbolError,
  PasswordDoesNotIncludeNumberError,
  PasswordDoesNotIncludeLowercaseLetterError,
  RepairCostError,
  RepairDateError,
  RepairNotFoundError,
  SparePartCostError,
  SparePartCriticalLevelError,
  SparePartHistoryRecordNotFoundError,
  SparePartNameError,
  SparePartNotFoundError,
  SparePartNotificationNotFoundError,
  SparePartOrderHistoryNotFoundError,
  SparePartQuantityInStockError,
  UnexpectedError,
  UnauthorizedError,
  UserAlreadyExistsError,
  UserNotFoundError,
  UsernameTooShortError,
  WarrantyCoverageDetailsError,
  WarrantyEndDateError,
  WarrantyNotFoundError,
  WarrantyStartDateError,
  CreateUserError,
  OrderCreateOrderItemError,
  OrderDateError,
  EstimatedDeliveryDateError,
  OrderNotFoundError,
  OrderItemCostPerUnitError,
  OrderItemDeliveredQuantityError,
  OrderItemNotFoundError,
  OrderItemQuantityExceedError,
  OrderItemQuantityOrderedError,
  OrderSparePartCostPerUnitError,
  OrderSparePartNullError,
  OrderSparePartQuantityError,
  MotorcycleTryStartDateError,
  MotorcycleTryEndDateError,
  MotorcycleTryNotFoundError,
  StartDateError,
  ContactInfoError,
  DeliveryError,
  DriverEmailError,
  DriverError,
  DriverPhoneError,
  DrivingRecordError,
  ExperienceError,
  IncompleteRepairError,
  InsufficientStockError,
  InvalidBreakdownError,
  InvalidMaintenanceIntervalError,
  InvalidMaintenanceRecordError,
  InvalidNotificationError,
  InvalidOrderError,
  InvalidQuantityError,
  InvalidRepairActionError,
  InvalidSparePartError,
  InvalidTestIDError,
  InvalidWarrantyError,
  InvalidWarrantyErrorParts,
  MaintenanceRecordNotFoundError,
  MileageError,
  MissingDriverError,
  MissingMotorcycleError,
  NegativeMileageError,
  NegativeNextServiceMileageError,
  ServiceDetailsError,
  InvalidLicenseErrorDrivers,
  MissingMotorcycleErrorDrivers,
  TestEndDateErrorDrivers,
};
