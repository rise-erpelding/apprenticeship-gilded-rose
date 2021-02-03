import { Item, updateQuality } from './gilded_rose';

// describe.skip('`updateQuality`', () => {
//   it("Updates the Quality", () => {
//     const standardItem = new Item('Haunted Shoe', 10, 10);
//     updateQuality([standardItem]);
//     expect(standardItem.quality).toBe(9);
//   });

//   it.todo('This is a good place for a good test!');
// });


describe('updating of general items', () => {
  const generalItem = new Item('Haunted Shoe', 10, 10);
  // console.log(generalItem);

  afterEach(() => {
    // updates the quality and sell_in back to original quantities
    generalItem.sell_in = 10;
    generalItem.quality = 10;
    // console.log(generalItem);
  });

  it('decrements the sell_in by 1', () => {
    updateQuality([generalItem]);
    expect(generalItem.sell_in).toBe(9);
  });

  it('decrements the quality by 1', () => {
    updateQuality([generalItem]);
    expect(generalItem.quality).toBe(9);
  });

  it('does not decrease the quality to a negative number', () => {
    generalItem.quality = 0;
    updateQuality([generalItem]);
    expect(generalItem.quality).toBe(0);
  });

  it('decreases quality twice as fast if the sell_in is less than 0', () => {
    generalItem.sell_in = -1;
    updateQuality([generalItem]);
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
    updateQuality([agedBrie]);
    expect(agedBrie.quality).toBe(1);
  });

  it('decrements the sell_in by 1', () => {
    updateQuality([agedBrie]);
    expect(agedBrie.sell_in).toBe(1);
  });

  it('does not increase the quality to more than 50', () => {
    agedBrie.quality = 50;
    updateQuality([agedBrie]);
    expect(agedBrie.quality).toBe(50);
  });

  it('increases in quality twice as fast if sell_in is less than 0', () => {
    agedBrie.sell_in = -1;
    updateQuality([agedBrie]);
    expect(agedBrie.quality).toBe(2);
  })

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

  it('decrements the sell_in by 1', () => {
    updateQuality([backstagePasses]);
    expect(backstagePasses.sell_in).toBe(4);
  });

  it('has a quality of 0 if the sell_in is 0', () => {
    backstagePasses.sell_in = 0;
    updateQuality([backstagePasses]);
    expect(backstagePasses.quality).toBe(0);
  });

  it('increases in quality by 3 if the sell_in is less than 6', () => {
    backstagePasses.sell_in = 4;
    updateQuality([backstagePasses]);
    expect(backstagePasses.quality).toBe(13);
  });

  it('increases in quality by 2 if the sell_in is less than 11', () => {
    backstagePasses.sell_in = 8;
    updateQuality([backstagePasses]);
    expect(backstagePasses.quality).toBe(12);
  });

  it('increases in quality by 1 if the sell_in is more than 10', () => {
    backstagePasses.sell_in = 11;
    updateQuality([backstagePasses]);
    expect(backstagePasses.quality).toBe(11);
  });

});