import { Driver } from "../../entities/drives/driver";
import { Motorcycle } from "../../entities/drives/motorcycle";
import { MotoTest } from "../../entities/drives/motoTest";


describe('MotoTest', () => {
  let motoTest: MotoTest;
  let moto: Motorcycle;
  let conducteur: Driver;

  beforeEach(() => {
    moto = new Motorcycle(
      '1',
      'Yamaha MT-09',
      1000,
      'Available',
      new Date('2023-01-01'),
      new Date('2023-06-01'),
      5000,
      'manager123'
    );

    conducteur = new Driver(
      'conducteur1',
      'Jean Dupont',
      '123456789',
      'A',
      5,
      { email: 'jean.dupont@example.com', phone: '123-456-7890' }
    );

    motoTest = new MotoTest(
      'test1',
      moto,
      conducteur,
      new Date('2023-10-01')
    );
  });

  describe('getTestDuration', () => {
    it("devrait retourner la durée du test en jours si la date de fin est définie", () => {
      motoTest.endTest(new Date('2023-10-10'));
      expect(motoTest.getTestDuration()).toBe(9); // 9 jours
    });

    it("devrait retourner null si la date de fin n'est pas définie", () => {
      expect(motoTest.getTestDuration()).toBeNull();
    });
  });

  describe('endTest', () => {
    it("devrait définir la date de fin si celle-ci est après la date de début", () => {
      const dateFin = new Date('2023-10-10');
      motoTest.endTest(dateFin);
      expect(motoTest.endDate).toEqual(dateFin);
    });

    it("ne devrait pas modifier la date de fin si celle-ci est avant la date de début", () => {
      const dateInvalide = new Date('2023-09-01');
      motoTest.endTest(dateInvalide);
      expect(motoTest.endDate).toBeNull(); // la date de fin reste null
    });
  });

  describe('isTestOngoing', () => {
    it("devrait retourner true si le test est en cours (date de fin est null)", () => {
      expect(motoTest.isTestOngoing()).toBe(true);
    });

    it("devrait retourner false si le test est terminé (date de fin est définie)", () => {
      motoTest.endTest(new Date('2023-10-10'));
      expect(motoTest.isTestOngoing()).toBe(false);
    });
  });

  describe('getTestSummary', () => {
    it("devrait retourner un résumé indiquant que le test est en cours si la date de fin n'est pas définie", () => {
      const summary = motoTest.getTestSummary();
      expect(summary).toBe(
        `Moto Test ID: test1 | Driver: Jean Dupont | Motorcycle: Yamaha MT-09 | Status: Ongoing`
      );
    });

    it("devrait retourner un résumé indiquant que le test est terminé avec la durée si la date de fin est définie", () => {
      motoTest.endTest(new Date('2023-10-10'));
      const summary = motoTest.getTestSummary();
      expect(summary).toBe(
        `Moto Test ID: test1 | Driver: Jean Dupont | Motorcycle: Yamaha MT-09 | Status: Completed in 9 days`
      );
    });
  });
});
