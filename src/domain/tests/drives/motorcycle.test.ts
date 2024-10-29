import { Motorcycle } from "../../entities/drives/motorcycle";

describe('Moto', () => {
  let moto: Motorcycle;

  beforeEach(() => {
    moto = new Motorcycle(
      '1',
      'Ducati Monster',
      1000,
      'Available',
      new Date('2023-01-01'),
      new Date('2023-06-01'),
      5000,
      'manager123'
    );
  });

  describe('mettreAJourKilometrage', () => {
    it("devrait mettre à jour le kilométrage si le nouveau kilométrage est supérieur au kilométrage actuel", () => {
      moto.updateMileage(1500);
      expect(moto.mileage).toBe(1500);
    });

    it("ne devrait pas mettre à jour le kilométrage si le nouveau kilométrage est inférieur au kilométrage actuel", () => {
      moto.updateMileage(500);
      expect(moto.mileage).toBe(1000); 
    });
  });

  describe('besoinEntretien', () => {
    it("devrait retourner vrai si le kilométrage est supérieur ou égal au prochain kilométrage d'entretien", () => {
      moto.updateMileage(5000);
      expect(moto.needsService()).toBe(true);
    });

    it("devrait retourner faux si le kilométrage est inférieur au prochain kilométrage d'entretien", () => {
      moto.updateMileage(3000);
      expect(moto.needsService()).toBe(false);
    });
  });

  describe('mettreAJourDetailsEntretien', () => {
    it("devrait mettre à jour le prochain kilométrage d'entretien et la date du dernier entretien", () => {
      const nouveauKilometrageEntretien = 6000;
      const nouvelleDateEntretien = new Date('2023-12-01');

      moto.updateServiceDetails(nouveauKilometrageEntretien, nouvelleDateEntretien);

      expect(moto.nextServiceMileage).toBe(nouveauKilometrageEntretien);
      expect(moto.lastServiceDate).toEqual(nouvelleDateEntretien);
    });
  });
});
