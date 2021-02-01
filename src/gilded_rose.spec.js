import { Item, updateQuality } from './gilded_rose';

describe('`updateQuality`', () => {
  it("Updates the Quality", () => {
    const standardItem = new Item('Haunted Shoe', 10, 10);
    updateQuality([standardItem]);
    expect(standardItem.quality).toBe(9);
  });

  it.todo('This is a good place for a good test!');
});