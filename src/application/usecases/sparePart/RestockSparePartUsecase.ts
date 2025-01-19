import { SparePartNotFoundError } from "../../../domain/errors/sparePart/SparePartNotFoundError";
import { SparePartRepository } from "../../repositories/SparePartRepository";

export class RestockSparePartUsecase {
  constructor(
    private readonly sparePartRepository: SparePartRepository,
  ) {}

  public async execute(id: string, quantity: number): Promise<void | Error> {
    const sparePart = await this.sparePartRepository.findById(id);
    if (!sparePart) {
      return new SparePartNotFoundError();
    }

    sparePart.restock(quantity);
    await this.sparePartRepository.save(sparePart);
  }
}
