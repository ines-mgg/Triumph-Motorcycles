import { SparePartRepository } from "../../repositories/SparePartRepository";

export class UseSparePartUsecase {
  constructor(
    private readonly sparePartRepository: SparePartRepository,
  ) {}

  public async execute(id: string, quantity: number): Promise<boolean | Error> {
    const sparePart = await this.sparePartRepository.findById(id);
    
    if(sparePart instanceof Error) return sparePart

    return sparePart.use(quantity);
  }
}
