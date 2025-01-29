import { v4 as uuidv4 } from 'uuid';
import { DriverEntity } from '../drives/DriverEntity';
import { Password } from '@triumph-motorcycles/domain/values/user/Password';
import { Username } from '@triumph-motorcycles/domain/values/user/Username';

export class UserEntity {
  private drivers: DriverEntity[] = [];

  private constructor(
    public readonly identifier: string,
    public username: Username,
    public password: Password,
    public readonly createdAt: Date,
    public updatedAt: Date,
    public readonly administrator: boolean,
  ) {}

  public static create(
    usernameValue: string,
    passwordValue: string,
    createdAt: Date,
    updatedAt: Date,
  ): UserEntity | Error {
    const administrator = false;

    const identifier = uuidv4();

    const username = Username.from(usernameValue);
    if (username instanceof Error) return username;

    const password = Password.from(passwordValue);
    if (password instanceof Error) return password;

    return new UserEntity(
      identifier,
      username,
      password,
      createdAt,
      updatedAt,
      administrator,
    );
  }

  public updatePassword(newPasswordValue: string): void | Error {
    const newPassword = Password.from(newPasswordValue);

    if (newPassword instanceof Error) return newPassword;

    this.password = newPassword;
    this.updatedAt = new Date();
  }

  public addDriver(driver: DriverEntity): void {
    this.drivers.push(driver);
  }

  public removeDriver(driverId: string): void {
    this.drivers = this.drivers.filter(
      (driver) => driver.driverId !== driverId,
    );
  }

  public getDrivers(): DriverEntity[] {
    return this.drivers;
  }

  public isAdmin(): boolean {
    return this.administrator;
  }

  public updateUsername(newUsernameValue: string): void | Error {
    const newUsername = Username.from(newUsernameValue);

    if (newUsername instanceof Error) return newUsername;

    this.username = newUsername;
    this.updatedAt = new Date();
  }

  public getRole(): string {
    return this.administrator ? 'Administrator' : 'User';
  }

  public validateCredentials(
    usernameValue: string,
    passwordValue: string,
  ): boolean {
    return (
      this.username.value === usernameValue.toLowerCase() &&
      this.password.compare(passwordValue)
    );
  }
}
