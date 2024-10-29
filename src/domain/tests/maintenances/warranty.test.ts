import { Warranty } from "../../entities/maintenances/warranty";


describe('Garantie', () => {
  let garantie: Warranty;

  beforeEach(() => {
    garantie = new Warranty(
      'warranty1',
      'moto1',
      new Date('2023-01-01'),
      new Date('2024-01-01'),
      'Couverture complète des réparations',
      true
    );
  });

  describe('isWarrantyValid', () => {
    it("devrait retourner true si la date de vérification est dans la période de garantie et que la garantie est active", () => {
      const dateValide = new Date('2023-06-01');
      expect(garantie.isWarrantyValid(dateValide)).toBe(true);
    });

    it("devrait retourner false si la date de vérification est avant la date de début de garantie", () => {
      const dateAvantGarantie = new Date('2022-12-31');
      expect(garantie.isWarrantyValid(dateAvantGarantie)).toBe(false);
    });

    it("devrait retourner false si la date de vérification est après la date de fin de garantie", () => {
      const dateApresGarantie = new Date('2024-01-02');
      expect(garantie.isWarrantyValid(dateApresGarantie)).toBe(false);
    });

    it("devrait retourner false si la garantie n'est pas active", () => {
      garantie.isActive = false;
      const datePendantGarantie = new Date('2023-06-01');
      expect(garantie.isWarrantyValid(datePendantGarantie)).toBe(false);
    });
  });

  describe('isRepairCovered', () => {
    it("devrait retourner true si la date de réparation est couverte par la garantie", () => {
      const dateReparation = new Date('2023-06-01');
      expect(garantie.isRepairCovered(dateReparation)).toBe(true);
    });

    it("devrait retourner false si la date de réparation est en dehors de la période de garantie", () => {
      const dateReparation = new Date('2024-02-01');
      expect(garantie.isRepairCovered(dateReparation)).toBe(false);
    });

    it("devrait retourner false si la garantie n'est pas active", () => {
      garantie.isActive = false;
      const dateReparation = new Date('2023-06-01');
      expect(garantie.isRepairCovered(dateReparation)).toBe(false);
    });
  });
});
