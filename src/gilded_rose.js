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

export function update(items) {
  for (var i = 0; i < items.length; i++) {
    // handles sulfuras only (by doing nothing)
    if (items[i].name === 'Sulfuras, Hand of Ragnaros') {
      break;
    }

    // handles other special items: Aged Brie, Backstage passes, eventually conjured items
    if (items[i].name === 'Aged Brie') {
      items[i].quality = incrementQuality(items[i].quality);
      if (items[i].sell_in < 0) {
        items[i].quality = incrementQuality(items[i].quality);
      }
    }
    else if (items[i].name === 'Backstage passes to a TAFKAL80ETC concert') {
      items[i].quality = incrementQuality(items[i].quality);
      if (items[i].sell_in < 11) {
          items[i].quality = incrementQuality(items[i].quality);             
      }
      if (items[i].sell_in < 6) {
          items[i].quality = incrementQuality(items[i].quality);
      }
      if (items[i].sell_in <= 0) {
        items[i].quality = setQualityToZero();
      }
    }
    // conjured items will go here eventually

    // general items/standard items/normal items 
    else {
      if (items[i].quality > 0) {
        items[i].quality = decrementQuality(items[i].quality);
      }
      if (items[i].sell_in < 0 && items[i].quality > 0) {
        items[i].quality = decrementQuality(items[i].quality); 
      }
    }
      // handles decrease in sell in for items
      items[i].sell_in = decrementSellIn(items[i].sell_in);

  }
}
