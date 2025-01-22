// Maintenance
export class MissingMotorcycleError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "MissingMotorcycleError";
    }
}

export class InvalidMaintenanceIntervalError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "InvalidMaintenanceIntervalError";
    }
}

//Breakdown
export class IncompleteRepairError extends Error {
    constructor(message: string) {
      super(message);
      this.name = 'IncompleteRepairError';
    }
}

export class InvalidWarrantyError extends Error {
    constructor(message: string) {
      super(message);
      this.name = 'InvalidWarrantyError';
    }
}

// MaintenanceNofitication
export class InvalidMaintenanceRecordError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "InvalidMaintenanceRecordError";
    }
}

export class MaintenanceRecordNotFoundError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "MaintenanceRecordNotFoundError";
    }
}

export class InvalidNotificationError extends Error {
    constructor(message: string) {
      super(message);
      this.name = 'InvalidNotificationError';
    }
}

// repaire
export class InvalidRepairActionError extends Error {
    constructor(action: string) {
      super(`Action "${action}" is not a recognized repair action.`);
      this.name = 'InvalidRepairActionError';
    }
}

// repaireHistory
export class InvalidBreakdownError extends Error {
    constructor(message: string) {
      super(message);
      this.name = 'InvalidBreakdownError';
    }
}
