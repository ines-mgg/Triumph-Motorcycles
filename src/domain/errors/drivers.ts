//Drive
export class DriverError extends Error {
    constructor(message: string) {
    super(message);
    this.name = "DriverError";
    }
}

export class DriverPhoneError extends Error {
    public override readonly name = "DriverPhoneError";
}
export class DriverEmailError extends Error {
    public override readonly name = "DriverEmailError";
}

export class InvalidLicenseError extends DriverError {
    constructor(licenseNumber: string) {
    super(`Invalid license number: ${licenseNumber}`);
    this.name = "InvalidLicenseError";
    }
}

export class ExperienceError extends Error {
    public override readonly name = "ExperienceError. Experience must be a number and at least 3";
}

export class ContactInfoError extends DriverError {
    constructor(message: string) {
    super(message);
    this.name = "ContactInfoError";
    }
}

export class DrivingRecordError extends DriverError {
    constructor(message: string) {
    super(message);
    this.name = "DrivingRecordError";
    }
}

// Motocycle
export class MileageError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "MileageError";
    }
}

export class ServiceDetailsError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "ServiceDetailsError";
    }
}

// MotoTest
export class TestEndDateError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "TestEndDateError";
    }
}

export class MissingMotorcycleError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "MissingMotorcycleError";
    }
}

export class MissingDriverError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "MissingDriverError";
    }
}

export class InvalidTestIDError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "InvalidTestIDError";
    }
}

export class NegativeMileageError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "NegativeMileageError";
    }
}

export class NegativeNextServiceMileageError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "NegativeNextServiceMileageError";
    }
}

