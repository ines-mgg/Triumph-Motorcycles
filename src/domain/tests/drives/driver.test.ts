/// <reference types="jest" />

import { Driver, DrivingRecord } from "../../entities/drives/driver";
import { InvalidLicenseError, ExperienceError, ContactInfoError, DrivingRecordError } from "../../errors/drivers"; 

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

    it("devrait lever une erreur si l'enregistrement de conduite n'est pas valide", () => {
      expect(() => {
        conducteur.addDrivingRecord({} as DrivingRecord); 
      }).toThrow(DrivingRecordError);
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
  
    it("ne devrait pas mettre à jour l'expérience et lever une erreur si le nouveau nombre d'années est inférieur à l'actuel", () => {
      expect(() => {
        conducteur.updateExperience(4);
      }).toThrow(ExperienceError);
    });
  
    it("ne devrait pas lever une erreur si le nouveau nombre d'années est égal à l'actuel", () => {
      expect(() => {
        conducteur.updateExperience(5);
      }).not.toThrow();
    });
  });

  describe('mettreAJourContact', () => {
    it("devrait mettre à jour les informations de contact du conducteur", () => {
      const nouveauContact = { email: 'nouveau.email@example.com', phone: '987-654-3210' };
      conducteur.updateContactInfo(nouveauContact);

      expect(conducteur.contactInfo).toEqual(nouveauContact);
    });

    it("devrait lever une erreur si l'email est invalide", () => {
      const mauvaisContact = { email: 'mauvais.email.com', phone: '987-654-3210' };
      expect(() => {
        conducteur.updateContactInfo(mauvaisContact);
      }).toThrow(ContactInfoError);
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

  describe('Validation des erreurs de conducteur', () => {
    it("devrait lever une erreur pour un numéro de permis invalide", () => {
      expect(() => {
        new Driver('conducteur2', 'Alice', 'INVALID_LICENSE', 'A', 5, { email: 'alice@example.com', phone: '123-456-7890' });
      }).toThrow(InvalidLicenseError);
    });

    it("devrait lever une erreur pour des années d'expérience négatives", () => {
      expect(() => {
        new Driver('conducteur3', 'Bob', 'LICENSE123', 'A', -1, { email: 'bob@example.com', phone: '123-456-7890' });
      }).toThrow(ExperienceError);
    });
  });
});
