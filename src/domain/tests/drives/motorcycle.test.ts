/// <reference types="jest" />

import { Motorcycle } from "../../entities/drives/motorcycle";
import { MileageError, ServiceDetailsError } from "../../errors/drivers";

describe('Motorcycle', () => {
    let motorcycle: Motorcycle;

    beforeEach(() => {
        motorcycle = new Motorcycle(
            'moto1',
            'Yamaha',
            5000,
            'Available',
            new Date('2022-01-01'),
            null,
            6000,
            'manager1'
        );
    });

    describe('updateMileage', () => {
        it('devrait mettre à jour le kilométrage si le nouveau kilométrage est supérieur', () => {
            motorcycle.updateMileage(6000);
            expect(motorcycle.mileage).toBe(6000);
        });

        it('devrait lever une erreur si le nouveau kilométrage est inférieur', () => {
            expect(() => {
                motorcycle.updateMileage(4000); 
            }).toThrow(MileageError);
        });
    });

    describe('updateServiceDetails', () => {
        it('devrait mettre à jour les détails de service si le nouveau kilométrage de service est supérieur au kilométrage actuel', () => {
            motorcycle.updateServiceDetails(7000, new Date('2022-06-01'));
            expect(motorcycle.nextServiceMileage).toBe(7000);
            expect(motorcycle.lastServiceDate).toEqual(new Date('2022-06-01'));
        });

        it('devrait lever une erreur si le nouveau kilométrage de service est inférieur au kilométrage actuel', () => {
            expect(() => {
                motorcycle.updateServiceDetails(4000, new Date('2022-06-01')); 
            }).toThrow(ServiceDetailsError);
        });
    });
});
