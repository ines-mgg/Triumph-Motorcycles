import { MotorcycleEntity } from "../drives";
import { UserEntity } from "../user/UserEntity";
import { CompanyEntity } from "./CompanyEntity";
import { Username } from "../../values/user/Username";
import { Password } from "../../values/user/Password";
import { MotorStatus } from "../../types/motorcycle";

describe("CompanyEntity", () => {
    let motorcycle: MotorcycleEntity;
    let user: UserEntity;
    const now = new Date();

    const validCompanyName = "ValidCompany";
    const invalidCompanyName = "Inv@lidName";

    beforeAll(() => {
        const username = Username.from("validUsername");
        const password = Password.from("Valid@123");

        if (username instanceof Error || password instanceof Error) {
            throw new Error("Invalid mock user creation.");
        }

        user = UserEntity.create(username.value, password.value, now, now) as UserEntity;

        const brand = 'Yamaha';
        const model = 'MT-09';
        const year = 2023;
        const purchaseDate = new Date('2023-01-01');
        const status: MotorStatus = 'Available';

        motorcycle = MotorcycleEntity.create(brand, model, year, purchaseDate, status) as MotorcycleEntity;
    });

    it("should create a company with a valid name", () => {
        const company = CompanyEntity.create(validCompanyName, user);

        expect(company).not.toBeInstanceOf(Error);

        if(company instanceof CompanyEntity) {
            expect(company.name.value).toBe(validCompanyName);
            expect(company.user).toBe(user);
        }   
    });

    it("should return an error if name is invalid", () => {
        const company = CompanyEntity.create(invalidCompanyName, user);

        expect(company).toBeInstanceOf(Error);
    });

    it("should update company name correctly", () => {
        const company = CompanyEntity.create(validCompanyName, user);
        const newName = "UpdatedCompany";

        if(company instanceof CompanyEntity) {
            company.updateName(newName);

            expect(company.name.value).toBe(newName);
        }
        
    });

    it("should return an error if trying to update with an invalid name", () => {
        const company = CompanyEntity.create(validCompanyName, user);
        let error;

        const invalidName = "NewNameWith$pecialChar";
        
        if (company instanceof CompanyEntity) error = company?.updateName(invalidName);

        expect(error).toBeInstanceOf(Error);
    });

    it("should add a motorcycle to the company", () => {
        const company = CompanyEntity.create(validCompanyName, user);

        if(company instanceof CompanyEntity) {
            company.addMotorcycle(motorcycle);

            const motorcycles = company.getMotorcycles();
            expect(motorcycles).toHaveLength(1);
            expect(motorcycles?.[0]).toBe(motorcycle);
        }  
    });

    it("should remove a motorcycle from the company", () => {
        const company = CompanyEntity.create(validCompanyName, user);

        if(company instanceof CompanyEntity) {
            company.addMotorcycle(motorcycle);
            const motorcycleId = motorcycle.id;
    
            company.removeMotorcycle(motorcycleId);
    
            const motorcycles = company.getMotorcycles();
            expect(motorcycles).toHaveLength(0);
        }  
    });

    it("should get company details", () => {
        const company = CompanyEntity.create(validCompanyName, user);

        if(company instanceof CompanyEntity) {
            const details = company?.getDetails();

            expect(details).toHaveProperty("identifier");
            expect(details?.name).toBe(validCompanyName);
            expect(details?.user).toBe(user);
            expect(details?.motorcycles).toHaveLength(0);
        }  
    });

    it("should not add motorcycles if already added", () => {
        const company = CompanyEntity.create(validCompanyName, user);

        if(company instanceof CompanyEntity) {
            company.addMotorcycle(motorcycle);
            company.addMotorcycle(motorcycle);
    
            const motorcycles = company.getMotorcycles();
            expect(motorcycles).toHaveLength(1);
        } 
    });
});
