import { Motorcycle } from "../../entities/drives/motorcycle";
import { Breakdown } from "../../entities/maintenances/breakdown";
import { RepairHistory } from "../../entities/maintenances/repairHistory";

describe('RepairHistory', () => {
  let repairHistory: RepairHistory;
  let breakdown1: Breakdown;
  let breakdown2: Breakdown;

  beforeEach(() => {
    repairHistory = new RepairHistory();

    const motorcycle1 = new Motorcycle(
      'motorcycle1',       
      'Ducati Monster',     
      1200,                 
      'Available',          
      new Date('2023-01-01'), 
      new Date('2023-06-01'), 
      5000,                 
      'manager123'     
    );

    const motorcycle2 = new Motorcycle(
      'motorcycle2',     
      'Yamaha YZF-R3',   
      800,                 
      'Available',          
      new Date('2023-02-01'), 
      new Date('2023-07-01'), 
      6000,                
      'manager456'         
    );

    breakdown1 = new Breakdown(
      'breakdown1',
      motorcycle1,
      'Flat tire',
      new Date('2023-10-29'),
      null
    );

    breakdown2 = new Breakdown(
      'breakdown2',
      motorcycle2,
      'Engine failure',
      new Date('2023-10-30'),
      null
    );
  });

  describe('addBreakdown', () => {
    it('devrait ajouter un breakdown à l\'historique', () => {
      repairHistory.addBreakdown(breakdown1);
      expect(repairHistory.getBreakdowns()).toContain(breakdown1);
    });

    it('devrait ajouter plusieurs breakdowns à l\'historique', () => {
      repairHistory.addBreakdown(breakdown1);
      repairHistory.addBreakdown(breakdown2);
      expect(repairHistory.getBreakdowns()).toContain(breakdown1);
      expect(repairHistory.getBreakdowns()).toContain(breakdown2);
    });
  });

  describe('getBreakdowns', () => {
    it('devrait retourner un tableau vide si aucun breakdown n\'a été ajouté', () => {
      expect(repairHistory.getBreakdowns()).toEqual([]);
    });
  });

  describe('getBreakdownsByMotorcycle', () => {
    it('devrait retourner les breakdowns correspondant à l\'ID de la motocyclette', () => {
      const motorcycleId = 'motorcycle1'; 

      repairHistory.addBreakdown(breakdown1);
      repairHistory.addBreakdown(breakdown2); 

      expect(repairHistory.getBreakdownsByMotorcycle(motorcycleId)).toContain(breakdown1);
      expect(repairHistory.getBreakdownsByMotorcycle(motorcycleId)).not.toContain(breakdown2);
    });
  });
});
