export class BreakdownDescriptionError extends Error {
    public override readonly name = "BreakdownDescriptionError. Maintenance interval mileage must be positive and can't exceed 100000.";
}