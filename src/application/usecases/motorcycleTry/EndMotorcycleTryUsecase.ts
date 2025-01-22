import { MotorcycleTryRepository } from "../../repositories/MotorcycleTryRepository";
export class EndMotorcycleTryUsecase {
  constructor(private readonly motorcycleTryRepository: MotorcycleTryRepository) {}

  public async execute(id: string, endDate: Date): Promise<void | Error> {
    const motorcycleTry = await this.motorcycleTryRepository.findOneById(id);

    if(motorcycleTry instanceof Error) return motorcycleTry

    motorcycleTry.endTest(endDate);
    await this.motorcycleTryRepository.save(motorcycleTry);
  }
}
