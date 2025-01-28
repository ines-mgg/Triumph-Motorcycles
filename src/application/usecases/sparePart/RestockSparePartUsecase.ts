import { SparePartRepository } from '@triumph-motorcycles/application/repositories/SparePartRepository';

export class RestockSparePartUsecase {
  constructor(private readonly sparePartRepository: SparePartRepository) {}

  public async execute(id: string, quantity: number): Promise<void | Error> {
    const sparePart = await this.sparePartRepository.findById(id);

    if (sparePart instanceof Error) return sparePart;

    sparePart.restock(quantity);
    await this.sparePartRepository.save(sparePart);
  }
}
