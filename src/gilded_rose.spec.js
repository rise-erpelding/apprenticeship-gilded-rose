import { Item, update } from './gilded_rose';

describe('updating of general items', () => {
  const variousGeneralItems = [new Item('Haunted Shoe', 10, 10), new Item('Mechanical Eraser', 3, 0), new Item('Monkey Business', -1, 4)];
  const updatedHauntedShoe = update(variousGeneralItems)[0];
  const updatedMechanicalEraser = update(variousGeneralItems)[1];
  const updatedMonkeyBusiness = update(variousGeneralItems)[2];

  it('decrements the sell_in by 1', () => {
    expect(updatedHauntedShoe.sell_in).toBe(9);
  });

  it('decrements the quality by 1', () => {
    expect(updatedHauntedShoe.quality).toBe(9);
  });

  it('does not decrease the quality to a negative number', () => {
    expect(updatedMechanicalEraser.quality).toBe(0);
  });

  it('decreases quality twice as fast if the sell_in is less than 0', () => {
    expect(updatedMonkeyBusiness.quality).toBe(2);
  });
});

describe('updating of aged brie', () => {
  const variousAgedBries = [new Item('French Aged Brie', 2, 0), new Item('Brazilian Aged Brie', 3, 50), new Item('Japanese Aged Brie', -1, 4)];
  const updatedFrenchAgedBrie = update(variousAgedBries)[0];
  const updatedBrazilianAgedBrie = update(variousAgedBries)[1];
  const updatedJapaneseAgedBrie = update(variousAgedBries)[2];

  it('increments in quality by 1', () => {
    expect(updatedFrenchAgedBrie.quality).toBe(1);
  });

  it('decrements the sell_in by 1', () => {
    expect(updatedFrenchAgedBrie.sell_in).toBe(1);
  });

  it('does not increase the quality to more than 50', () => {
    expect(updatedBrazilianAgedBrie.quality).toBe(50);
  });

  it('increases in quality twice as fast if sell_in is less than 0', () => {
    expect(updatedJapaneseAgedBrie.quality).toBe(6);
  });
});

describe('updating of sulfuras', () => {
  const sulfuras = new Item('Sulfuras, Hand of Ragnaros', 0, 80);
  const updatedSulfuras = update([sulfuras])[0];

  it('does not update sell_in', () => {
    expect(updatedSulfuras.sell_in).toBe(0);
  });

  it('does not update quality', () => {
    expect(updatedSulfuras.quality).toBe(80);
  });
});

describe('updating of conjured items', () => {
  const variousConjuredItems = [new Item('Conjured Mana Cake', 3, 6), new Item('Conjured Rabbit', -1, 8)];
  const updatedConjuredManaCake = update(variousConjuredItems)[0];
  const updatedConjuredRabbit = update(variousConjuredItems)[1];

  it('decrements the sell_in by 1', () => {
    expect(updatedConjuredManaCake.sell_in).toBe(2);
  });

  it('decreases the quality by 2', () => {
    expect(updatedConjuredManaCake.quality).toBe(4);
  });

  // logic not implemented but this is how it should be
  it('decreases quality twice as fast after sell in is 0', () => {
    expect(updatedConjuredRabbit.quality).toBe(4);
  });
});

describe('updating of backstage passes', () => {
  const variousBackstagePasses = [
    new Item('Backstage passes to a TAFKAL80ETC concert', 0, 8),
    new Item('Backstage passes to a Moby concert', 4, 8),
    new Item('Backstage passes to an NSYNC concert', 8, 8),
    new Item('Backstage passes to a Cher concert', 11, 8),
  ];
  const updatedTafkaPasses = update(variousBackstagePasses)[0];
  const updatedMobyPasses = update(variousBackstagePasses)[1];
  const updatedNsyncPasses = update(variousBackstagePasses)[2];
  const updatedCherPasses = update(variousBackstagePasses)[3];

  it('decrements the sell_in by 1', () => {
    expect(updatedMobyPasses.sell_in).toBe(3);
  });

  it('has a quality of 0 if the sell_in is 0', () => {
    expect(updatedTafkaPasses.quality).toBe(0);
  });

  it('increases in quality by 3 if the sell_in is less than or equal to 5', () => {
    expect(updatedMobyPasses.quality).toBe(11);
  });

  it('increases in quality by 2 if the sell_in is less than or equal to 10', () => {
    expect(updatedNsyncPasses.quality).toBe(10);
  });

  it('increases in quality by 1 if the sell_in is more than 10', () => {
    expect(updatedCherPasses.quality).toBe(9);
  });
});
