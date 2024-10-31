export class InvalidOrderError extends Error {
    constructor(message: string) {
      super(message);
      this.name = 'InvalidOrderError';
    }
}

export class InvalidQuantityError extends Error {
    constructor(message: string) {
      super(message);
      this.name = "InvalidQuantityError";
    }
  }
  
export class InsufficientStockError extends Error {
    constructor(message: string) {
      super(message);
      this.name = "InsufficientStockError";
    }
}
  
export class InvalidWarrantyError extends Error {
    constructor(message: string) {
      super(message);
      this.name = "InvalidWarrantyError";
    }
}


  
export class DeliveryError extends Error {
    constructor(message: string) {
      super(message);
      this.name = "DeliveryError";
    }
}

export class InvalidSparePartError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "InvalidSparePartError";
    }
}