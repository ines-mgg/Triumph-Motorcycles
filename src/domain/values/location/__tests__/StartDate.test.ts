import { StartDate } from '../StartDate';
describe('StartDate', () => {
  it('should create a valid StartDate instance', () => {
    const now = new Date();
    const startDate = StartDate.from(now);
    expect(startDate).toBeInstanceOf(StartDate);
    if (startDate instanceof StartDate) {
      expect(startDate.value).toStrictEqual(now);
    }
  });
});
