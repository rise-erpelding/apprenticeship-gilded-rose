// Item constructor. DO NOT MODIFY OR THE GOBLIN WILL EAT YOU!
export function Item(name, sell_in, quality) {
  this.name = name;
  this.sell_in = sell_in;
  this.quality = quality;
}

/*
* Update inventory
* @param {Item[]} items - an array of Items representing the inventory to be updated
* Example usage:

const items = [
  new Item('+5 Dexterity Vest', 10, 20),
  new Item('Aged Brie', 2, 0),
  new Item('Elixir of the Mongoose', 5, 7),
  new Item('Sulfuras, Hand of Ragnaros', 0, 80),
  new Item('Backstage passes to a TAFKAL80ETC concert', 15, 20),
  new Item('Conjured Mana Cake', 3, 6),
];

updateQuality(items);
*/

function decrementQuality(itemQuality) {
  return itemQuality - 1;
}

function incrementQuality(itemQuality) {
  if (itemQuality >= 50) {
    return 50;
  }
  return itemQuality + 1;
}

function setQualityToZero() {
  return 0;
}

function decrementSellIn(itemSellIn) {
  return itemSellIn - 1;
}

function updateQuality(item) {
    // handles other special items: Aged Brie, Backstage passes, eventually conjured items
    if (item.name === 'Aged Brie') {
      item.quality = incrementQuality(item.quality);
      if (item.sell_in < 0) {
        item.quality = incrementQuality(item.quality);
      }
    }
    else if (item.name === 'Backstage passes to a TAFKAL80ETC concert') {
      item.quality = incrementQuality(item.quality);
      if (item.sell_in < 11) {
        item.quality = incrementQuality(item.quality);
      }
      if (item.sell_in < 6) {
        item.quality = incrementQuality(item.quality);
      }
      if (item.sell_in <= 0) {
        item.quality = setQualityToZero();
      }
    }
    // conjured items will go here eventually

    // general items/standard items/normal items 
    else {
      if (item.quality > 0) {
        item.quality = decrementQuality(item.quality);
      }
      if (item.sell_in < 0 && item.quality > 0) {
        item.quality = decrementQuality(item.quality);
      }
    }
}

function updateSellIn(item) {
  item.sell_in = decrementSellIn(item.sell_in);
}

export function update(items) {
  items.forEach(item => {
    // handles sulfuras only (by doing nothing)
    if (item.name === 'Sulfuras, Hand of Ragnaros') {
      return;
    }


    else {
      // handles update quality for all non-sulfuras items
      updateQuality(item);

      // handles decrease in sell in for all non-sulfuras items
      updateSellIn(item);
    }
  })
}
