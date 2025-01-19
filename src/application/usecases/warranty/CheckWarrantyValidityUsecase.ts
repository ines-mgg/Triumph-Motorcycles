import { WarrantyNotFoundError } from "../../../domain/errors/warranty/WarrantyNotFoundError";
import { WarrantyRepository } from "../../repositories/WarrantyRepository";

export class CheckWarrantyValidityUsecase {
  constructor(
    private readonly warrantyRepository: WarrantyRepository,
  ) {}

  public async execute(warrantyId: string, checkDate: Date): Promise<boolean | Error> {
    const warranty = await this.warrantyRepository.findById(warrantyId);
    if (!warranty) {
      return new WarrantyNotFoundError();
    }
    return warranty.isWarrantyValid(checkDate);
  }
}
