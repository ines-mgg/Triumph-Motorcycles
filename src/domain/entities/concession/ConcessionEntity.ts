import { v4 as uuidv4 } from 'uuid';
import { MotorcycleEntity } from '../drives/MotorcycleEntity';
import { UserEntity } from '../user/UserEntity';
import { Name } from '@triumph-motorcycles/domain/values/concession/name';

export class ConcessionEntity {
  private motorcycles: MotorcycleEntity[] = [];

  private constructor(
    public readonly identifier: string,
    public name: Name,
    public user: UserEntity,
    public createdAt: Date,
    public updatedAt: Date,
  ) {}

  public static create(
    nameValue: string,
    user: UserEntity,
  ): ConcessionEntity | Error {
    const name = Name.from(nameValue);
    if (name instanceof Error) return name;

    const identifier = uuidv4();
    const createdAt = new Date();
    const updatedAt = new Date();

    return new ConcessionEntity(identifier, name, user, createdAt, updatedAt);
  }

  public updateName(newNameValue: string): void | Error {
    const newName = Name.from(newNameValue);
    if (newName instanceof Error) return newName;

    this.name = newName;
    this.updatedAt = new Date();
  }

  public addMotorcycle(motorcycle: MotorcycleEntity): void {
    this.motorcycles.push(motorcycle);
  }

  public removeMotorcycle(motorcycleId: string): void {
    this.motorcycles = this.motorcycles.filter(
      (motorcycle) => motorcycle.id !== motorcycleId,
    );
  }

  public getMotorcycles(): MotorcycleEntity[] {
    return this.motorcycles;
  }

  public getDetails(): {
    identifier: string;
    name: string;
    user: UserEntity;
    motorcycles: MotorcycleEntity[];
  } {
    return {
      identifier: this.identifier,
      name: this.name.value,
      user: this.user,
      motorcycles: this.motorcycles,
    };
  }
}
