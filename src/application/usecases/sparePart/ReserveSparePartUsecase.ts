import { SparePartNotFoundError } from "../../../domain/errors/sparePart/SparePartNotFoundError";
import { SparePartRepository } from "../../repositories/SparePartRepository";

export class ReserveSparePartUsecase {
  constructor(
    private readonly sparePartRepository: SparePartRepository,
  ) {}

  public async execute(id: string, quantity: number): Promise<boolean | Error> {
    const sparePart = await this.sparePartRepository.findById(id);
    if (!sparePart) {
      return new SparePartNotFoundError();
    }

    return sparePart.reserve(quantity);
  }
}
