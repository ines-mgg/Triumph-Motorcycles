
export class BaseEntity {
    public readonly createdAt: Date;
    public updatedAt: Date;
  
    constructor() {
      this.createdAt = new Date();
      this.updatedAt = new Date();
    }
  }
  