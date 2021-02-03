import { Item, updateQuality } from './gilded_rose';

describe('updating of aged brie', () => {
  const agedBrie = new Item('Aged Brie', 2, 0);

  afterEach(() => {
    // updates the quality and sell_in back to original quantities
    agedBrie.sell_in = 2;
    agedBrie.quality = 0;
  });

  it('increases the quality of the item by 1', () => {
    updateQuality([agedBrie]);
    expect(agedBrie.quality).toBe(1);
  });

  // it('decreases the sell_in of the item by 1', () => {
  //   updateQuality([agedBrie]);
  //   expect(agedBrie.sell_in).toBe(1);
  // });

  it('does not increase the quality of the item to more than 50', () => {
    agedBrie.quality = 50;
    updateQuality([agedBrie]);
    expect(agedBrie.quality).toBe(50);
  });

  it('increases in quality of the item by 2 if sell_in is less than 0', () => {
    agedBrie.sell_in = -1;
    updateQuality([agedBrie]);
    expect(agedBrie.quality).toBe(2);
  });

});

describe('updating of sulfuras', () => {
  const sulfuras = new Item('Sulfuras, Hand of Ragnaros', 0, 80);

  it('does not update sell_in', () => {
    updateQuality([sulfuras]);
    expect(sulfuras.sell_in).toBe(0);
  });

  it('does not update quality', () => {
    updateQuality([sulfuras]);
    expect(sulfuras.quality).toBe(80);
  });

});

describe('updating of backstage passes', () => {
  let backstagePasses = new Item('Backstage passes to a TAFKAL80ETC concert', 5, 10);

  afterEach(() => {
    // updates the quality and sell_in back to original quantities
    backstagePasses.sell_in = 5;
    backstagePasses.quality = 10;
  });

  it('decreases the sell_in of the item by 1', () => {
    updateQuality([backstagePasses]);
    expect(backstagePasses.sell_in).toBe(4);
  });

  it('decreases the quality of the item to 0 if the sell_in is 0', () => {
    backstagePasses.sell_in = 0;
    updateQuality([backstagePasses]);
    expect(backstagePasses.quality).toBe(0);
  });

  it('increases the quality of the item by 3 if the sell_in is 5 or less', () => {
    backstagePasses.sell_in = 4;
    updateQuality([backstagePasses]);
    expect(backstagePasses.quality).toBe(13);
  });

  it('increases the quality of the item by 2 if the sell_in is 10 or less', () => {
    backstagePasses.sell_in = 8;
    updateQuality([backstagePasses]);
    expect(backstagePasses.quality).toBe(12);
  });

  it('increases the quality of the item by 1 if the sell_in is more than 10', () => {
    backstagePasses.sell_in = 11;
    updateQuality([backstagePasses]);
    expect(backstagePasses.quality).toBe(11);
  });

  it('increases the quality of the item by 1 if the sell_in is more than 10', () => {
    backstagePasses.quality = 20;
    updateQuality([backstagePasses]);
    expect(backstagePasses.quality).toBe(23);
  });
});

describe('updating of general items', () => {
  const generalItem = new Item('Haunted Shoe', 10, 10);

  afterEach(() => {
    // updates the quality and sell_in back to original quantities
    generalItem.sell_in = 10;
    generalItem.quality = 10;
    // console.log(generalItem);
  });

  it('decreases the sell_in of the item by 1', () => {
    updateQuality([generalItem]);
    expect(generalItem.sell_in).toBe(9);
  });

  it('decreases the quality of the item by 1', () => {
    updateQuality([generalItem]);
    expect(generalItem.quality).toBe(9);
  });

  it('does not decrease the quality of the item to a negative number', () => {
    generalItem.quality = 0;
    updateQuality([generalItem]);
    expect(generalItem.quality).toBe(0);
  });

  it('decreases the quality of the item by 2 if the sell_in is less than 0', () => {
    generalItem.sell_in = -1;
    updateQuality([generalItem]);
    expect(generalItem.quality).toBe(8);
  });
});