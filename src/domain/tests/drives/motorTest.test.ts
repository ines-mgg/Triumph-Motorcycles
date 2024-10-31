/// <reference types="jest" />

import { Driver } from '../../entities/drives/driver';
import { Motorcycle } from '../../entities/drives/motorcycle';
import { MotoTest } from '../../entities/drives/motoTest';
import {
    TestEndDateError,
    MissingMotorcycleError,
    MissingDriverError,
    InvalidTestIDError,
} from '../../errors/drivers';

describe('MotoTest', () => {
    let motoTest: MotoTest;
    let motorcycle: Motorcycle;
    let driver: Driver;

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

        driver = new Driver(
            'driver1',
            'John Doe',
            'XYZ123456',
            'A',
            3,
            { email: 'john@example.com', phone: '123-456-7890' }
        );

        motoTest = new MotoTest(
            'test1',
            motorcycle,
            driver,
            new Date('2023-01-01')
        );
    });

    describe('Constructor', () => {
        it('devrait lever une erreur si l’ID du test est vide', () => {
            expect(() => {
                new MotoTest('', motorcycle, driver, new Date('2023-01-01'));
            }).toThrow(InvalidTestIDError);
        });

        it('devrait lever une erreur si la moto est manquante', () => {
            expect(() => {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                new MotoTest('test1', null as any, driver, new Date('2023-01-01'));
            }).toThrow(MissingMotorcycleError);
        });

        it('devrait lever une erreur si le conducteur est manquant', () => {
            expect(() => {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                new MotoTest('test1', motorcycle, null as any, new Date('2023-01-01'));
            }).toThrow(MissingDriverError);
        });
    });

    describe('getTestDuration', () => {
        it('devrait retourner la durée du test en jours', () => {
            motoTest.endTest(new Date('2023-01-05'));
            expect(motoTest.getTestDuration()).toBe(4);
        });

        it('devrait retourner null si le test est en cours', () => {
            expect(motoTest.getTestDuration()).toBeNull();
        });
    });

    describe('endTest', () => {
        it('devrait définir la date de fin du test si la date est valide', () => {
            motoTest.endTest(new Date('2023-01-05'));
            expect(motoTest.endDate).toEqual(new Date('2023-01-05'));
        });

        it('devrait lever une erreur si la date de fin est antérieure à la date de début', () => {
            expect(() => {
                motoTest.endTest(new Date('2022-12-31'));
            }).toThrow(TestEndDateError);
        });
    });

    describe('isTestOngoing', () => {
        it('devrait retourner vrai si le test est en cours', () => {
            expect(motoTest.isTestOngoing()).toBe(true);
        });

        it('devrait retourner faux si le test est terminé', () => {
            motoTest.endTest(new Date('2023-01-05'));
            expect(motoTest.isTestOngoing()).toBe(false);
        });
    });

    describe('getTestSummary', () => {
        it('devrait retourner un résumé du test', () => {
            motoTest.endTest(new Date('2023-01-05'));
            const summary = motoTest.getTestSummary();
            expect(summary).toContain('Moto Test ID: test1');
            expect(summary).toContain('Driver: John Doe');
            expect(summary).toContain('Motorcycle: Yamaha');
            expect(summary).toContain('Completed in 4 days');
        });

        it('devrait indiquer que le test est en cours', () => {
            const summary = motoTest.getTestSummary();
            expect(summary).toContain('Ongoing');
        });
    });
});