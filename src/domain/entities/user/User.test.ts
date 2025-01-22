import { UsernameTooShortError } from "../../errors/user/UsernameTooShortError";
import { DriverEntity } from "../drives";
import { UserEntity } from "./UserEntity";
import { PasswordTooShortError } from "../../errors/user/PasswordTooShortError";

describe("UserEntity", () => {
  const now = new Date();
  let driver: DriverEntity;
  let driver1: DriverEntity;
  let driver2: DriverEntity;

  beforeEach(() => {
    driver = DriverEntity.create(
        "Justin Katasi",
        "B",
        "AB12345678",
        5,
        "justin.katasi@example.com",
        "0987654321"
      ) as DriverEntity;
      
      driver1 = DriverEntity.create(
        "Johnathan Doe",
        "A",
        "YIAB123456",
        7,
        "john.doe@example.com",
        "0987654321",
      ) as DriverEntity;
      
      driver2 = DriverEntity.create(
        "Stephanie Niam",
        "A",
        "ZYXWV12345",
        4,
        "stef.niam@example.com",
        "0987654321"
      ) as DriverEntity;
  });

  it("should create a UserEntity successfully", () => {
    const username = "validUsername";
    const password = "Valid@123";
    const user = UserEntity.create(username, password, now, now);

    expect(user).toBeInstanceOf(UserEntity);
    if (user instanceof UserEntity) {
      expect(user.username.value).toBe(username.toLowerCase());
      expect(user.administrator).toBe(false);
    }
  });

  it("should return an error when username is invalid", () => {
    const username = "ab";
    const password = "Valid@123";

    const user = UserEntity.create(username, password, now, now);

    expect(user).toBeInstanceOf(UsernameTooShortError);
  });

  it("should return an error when password is invalid", () => {
    const username = "validUsername";
    const password = "short";

    const user = UserEntity.create(username, password, now, now);

    expect(user).toBeInstanceOf(PasswordTooShortError);
  });

  it("should update the username successfully", () => {
    const username = "validUsername";
    const password = "Valid@123";
    const user = UserEntity.create(username, password, now, now);

    if (user instanceof UserEntity) {
      const newUsername = "updatedUsername";
      user.updateUsername(newUsername);

      expect(user.username.value).toBe(newUsername.toLowerCase());
      expect(user.updatedAt.getTime()).toBeGreaterThan(now.getTime());
    }
  });

  it("should return an error when updating to an invalid username", () => {
    const username = "validUsername";
    const password = "Valid@123";
    const user = UserEntity.create(username, password, now, now);

    if (user instanceof UserEntity) {
        const invalidUsername = "ab";
        const result = user.updateUsername(invalidUsername);
  
        expect(result).toBeInstanceOf(UsernameTooShortError);
      }
  });

  it("should update the password successfully", () => {
    const username = "validUsername";
    const password = "Valid@123";
    const user = UserEntity.create(username, password, now, now);

    if (user instanceof UserEntity) {
      const newPassword = "NewPassword@123";
      const result = user.updatePassword(newPassword);

      expect(result).toBeUndefined();
      expect(user.password.compare(newPassword)).toBe(true);
      expect(user.updatedAt.getTime()).toBeGreaterThan(now.getTime());
    }
  });

  it("should return an error when updating to an invalid password", () => {
    const username = "validUsername";
    const password = "Valid@123";
    const user = UserEntity.create(username, password, now, now);

    if (user instanceof UserEntity) {
      const invalidPassword = "short";
      const result = user.updatePassword(invalidPassword);

      expect(result).toBeInstanceOf(PasswordTooShortError);
    }
  });

  it("should add a driver successfully", () => {
    const username = "validUsername";
    const password = "Valid@123";
    const user = UserEntity.create(username, password, now, now);

    if (user instanceof UserEntity) {
      user.addDriver(driver);

      expect(user.getDrivers().length).toBe(1);
      expect(user.getDrivers()[0].driverId).toBe(driver.driverId);
    }
  });

  it("should remove a driver successfully", () => {
    const username = "validUsername";
    const password = "Valid@123";
    const user = UserEntity.create(username, password, now, now);
  
    if (user instanceof UserEntity) {

      user.addDriver(driver1);
      user.addDriver(driver2);
  
      expect(user.getDrivers().length).toBe(2); 
  
      user.removeDriver(driver1.driverId);
  
      const remainingDrivers = user.getDrivers();
      expect(remainingDrivers.length).toBe(1);
    }
  });
  

  it("should validate credentials correctly", () => {
    const username = "validUsername";
    const password = "Valid@123";
    const user = UserEntity.create(username, password, now, now);
  
    if (user instanceof UserEntity) {
      expect(user.validateCredentials(username, password)).toBe(true);
      expect(user.validateCredentials(username, "Invalid@123")).toBe(false); 
      expect(user.validateCredentials("wrongUsername", password)).toBe(false); 
    }
  });

  it("should return the correct role", () => {
    const username = "validUsername";
    const password = "Valid@123";

    const regularUser = UserEntity.create(username, password, now, now);

    if (regularUser instanceof UserEntity) {
      expect(regularUser.getRole()).toBe("User");
    } 
  });

});
