import { Driver, DrivingRecord } from "../../entities/drives/driver";


describe('Conducteur', () => {
  let conducteur: Driver;

  beforeEach(() => {
    conducteur = new Driver(
      'conducteur1',
      'Jean Dupont',
      '123456789',
      'A',
      5,
      { email: 'jeandurool@example.com', phone: '123-456-7890' }
    );
  });

  describe('ajouterHistoriqueConduite', () => {
    it("devrait ajouter un nouvel enregistrement de conduite à l'historique de conduite", () => {
      const record = new DrivingRecord(new Date('2023-01-01'), 'moto1', 'Test Drive', 'Essai de routine');
      conducteur.addDrivingRecord(record);

      expect(conducteur.getDrivingHistory()).toContain(record);
    });
  });

  describe('getHistoriqueConduite', () => {
    it('devrait retourner tout l’historique de conduite du conducteur', () => {
      const record = new DrivingRecord(new Date('2023-01-01'), 'moto1', 'Test Drive', 'Essai de routine');
      conducteur.addDrivingRecord(record);

      expect(conducteur.getDrivingHistory()).toEqual([record]);
    });
  });

  describe('mettreAJourExperience', () => {
    it("devrait mettre à jour l'expérience si le nouveau nombre d'années est supérieur à l'actuel", () => {
      conducteur.updateExperience(10);
      expect(conducteur.yearsOfExperience).toBe(10);
    });

    it("ne devrait pas mettre à jour l'expérience si le nouveau nombre d'années est inférieur ou égal à l'actuel", () => {
      conducteur.updateExperience(3);
      expect(conducteur.yearsOfExperience).toBe(5); 
    });
  });

  describe('mettreAJourContact', () => {
    it("devrait mettre à jour les informations de contact du conducteur", () => {
      const nouveauContact = { email: 'nouveau.email@example.com', phone: '987-654-3210' };
      conducteur.updateContactInfo(nouveauContact);

      expect(conducteur.contactInfo).toEqual(nouveauContact);
    });
  });

  describe('historiqueIncidents', () => {
    it("devrait retourner vrai si l'historique de conduite contient un incident", () => {
      const incident = new DrivingRecord(new Date('2023-01-01'), 'moto1', 'Incident', 'Collision mineure');
      conducteur.addDrivingRecord(incident);

      expect(conducteur.hasIncidentHistory()).toBe(true);
    });

    it("devrait retourner faux si l'historique de conduite ne contient aucun incident", () => {
      const essai = new DrivingRecord(new Date('2023-01-01'), 'moto1', 'Test Drive', 'Essai de routine');
      conducteur.addDrivingRecord(essai);

      expect(conducteur.hasIncidentHistory()).toBe(false);
    });
  });
});
