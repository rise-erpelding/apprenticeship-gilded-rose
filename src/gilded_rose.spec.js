import { Item, update } from './gilded_rose';

describe('updating of general items', () => {
  const generalItem = new Item('Haunted Shoe', 10, 10);

  afterEach(() => {
    // updates the quality and sell_in back to original quantities
    generalItem.sell_in = 10;
    generalItem.quality = 10;
  });

  it('decrements the sell_in by 1', () => {
    update([generalItem]);
    expect(generalItem.sell_in).toBe(9);
  });

  it('decrements the quality by 1', () => {
    update([generalItem]);
    expect(generalItem.quality).toBe(9);
  });

  it('does not decrease the quality to a negative number', () => {
    generalItem.quality = 0;
    update([generalItem]);
    expect(generalItem.quality).toBe(0);
  });

  it('decreases quality twice as fast if the sell_in is less than 0', () => {
    generalItem.sell_in = -1;
    update([generalItem]);
    expect(generalItem.quality).toBe(8);
  });
});

describe('updating of aged brie', () => {
  const agedBrie = new Item('Aged Brie', 2, 0);

  afterEach(() => {
    // updates the quality and sell_in back to original quantities
    agedBrie.sell_in = 2;
    agedBrie.quality = 0;
  });

  it('increments in quality by 1', () => {
    update([agedBrie]);
    expect(agedBrie.quality).toBe(1);
  });

  it('decrements the sell_in by 1', () => {
    update([agedBrie]);
    expect(agedBrie.sell_in).toBe(1);
  });

  it('does not increase the quality to more than 50', () => {
    agedBrie.quality = 50;
    update([agedBrie]);
    expect(agedBrie.quality).toBe(50);
  });

  it('increases in quality twice as fast if sell_in is less than 0', () => {
    agedBrie.sell_in = -1;
    update([agedBrie]);
    expect(agedBrie.quality).toBe(2);
  });
});

describe('updating of sulfuras', () => {
  const sulfuras = new Item('Sulfuras, Hand of Ragnaros', 0, 80);

  it('does not update sell_in', () => {
    update([sulfuras]);
    expect(sulfuras.sell_in).toBe(0);
  });

  it('does not update quality', () => {
    update([sulfuras]);
    expect(sulfuras.quality).toBe(80);
  });
});

describe.skip('updating of conjured items', () => {
  const conjuredItem = new Item('Conjured Mana Cake', 3, 6);

  afterEach(() => {
    // updates the quality and sell_in back to original quantities
    conjuredItem.sell_in = 3;
    conjuredItem.quality = 6;
  });

  it('decrements the sell_in by 1', () => {
    update([conjuredItem]);
    expect(conjuredItem.sell_in).toBe(2);
  });

  it('decreases the quality by 2', () => {
    update([conjuredItem]);
    expect(conjuredItem.quality).toBe(4);
  });
});

describe('updating of backstage passes', () => {
  const backstagePasses = new Item('Backstage passes to a TAFKAL80ETC concert', 5, 10);

  afterEach(() => {
    // updates the quality and sell_in back to original quantities
    backstagePasses.sell_in = 5;
    backstagePasses.quality = 10;
  });

  it('decrements the sell_in by 1', () => {
    update([backstagePasses]);
    expect(backstagePasses.sell_in).toBe(4);
  });

  it('has a quality of 0 if the sell_in is 0', () => {
    backstagePasses.sell_in = 0;
    update([backstagePasses]);
    expect(backstagePasses.quality).toBe(0);
  });

  it('increases in quality by 3 if the sell_in is less than 6', () => {
    backstagePasses.sell_in = 4;
    update([backstagePasses]);
    expect(backstagePasses.quality).toBe(13);
  });

  it('increases in quality by 2 if the sell_in is less than 11', () => {
    backstagePasses.sell_in = 8;
    update([backstagePasses]);
    expect(backstagePasses.quality).toBe(12);
  });

  it('increases in quality by 1 if the sell_in is more than 10', () => {
    backstagePasses.sell_in = 11;
    update([backstagePasses]);
    expect(backstagePasses.quality).toBe(11);
  });
});
