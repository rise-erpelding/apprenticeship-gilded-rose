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
    // handles decrease in quality for regular items (as long as quality > 0)
    if (items[i].name != 'Aged Brie' && items[i].name != 'Backstage passes to a TAFKAL80ETC concert') {
      if (items[i].quality > 0) {
        if (items[i].name != 'Sulfuras, Hand of Ragnaros') {
          items[i].quality = decrementQuality(items[i].quality);
        }
      }
    } else {
      // handles increase in quality for Aged Brie and Backstage passes
      if (items[i].quality < 50) {
        items[i].quality = items[i].quality + 1
        if (items[i].name == 'Backstage passes to a TAFKAL80ETC concert') {
          if (items[i].sell_in < 11) {
            if (items[i].quality < 50) {
              items[i].quality = incrementQuality(items[i].quality) ;             
            }
          }
          if (items[i].sell_in < 6) {
            if (items[i].quality < 50) {
              items[i].quality = incrementQuality(items[i].quality);
            }
          }
        }
      }
    }
    if (items[i].name != 'Sulfuras, Hand of Ragnaros') {
      // handles decrease in sell in for all items except sulfuras
      items[i].sell_in = decrementSellIn(items[i].sell_in);
    }
    if (items[i].sell_in < 0) {
      // handles if sell_in is negative
      if (items[i].name != 'Aged Brie') {
        if (items[i].name != 'Backstage passes to a TAFKAL80ETC concert') {
          if (items[i].quality > 0) {
            if (items[i].name != 'Sulfuras, Hand of Ragnaros') {
              // handles additional decrease in quality after sell_in is 0
              items[i].quality = decrementQuality(items[i].quality);
            }
          }
        } else {
          // sets quality to 0 for backstage passes
          items[i].quality = setQualityToZero();
        }
      } else {
        // handles increase for aged brie but only if quality is < 50
        if (items[i].quality < 50) {
          items[i].quality = incrementQuality(items[i].quality);
        }
      }
    }
  }
}
