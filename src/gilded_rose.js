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

function decreaseQuality(currQuality, decAmount = 1) {
  return currQuality - decAmount;
}

function increaseQuality(currQuality, incAmount = 1) {
  if (currQuality >= 50) {
    return 50;
  }
  return currQuality + incAmount;
}

function setQualityToZero() {
  return 0;
}

function decreaseSellIn(currSellIn, decAmount = 1) {
  return currSellIn - decAmount;
}

function updateQuality(item) {
  if (item.name.toLowerCase().includes('sulfuras')) {
    return; // Question about return statements
  }
  if (item.name.toLowerCase().includes('aged brie')) {
    item.sell_in < 0 ? 
      item.quality = increaseQuality(item.quality, 2) :
      item.quality = increaseQuality(item.quality);
  }
  else if (item.name.toLowerCase().includes('backstage passes')) {
    if (item.sell_in <= 0) {
      item.quality = setQualityToZero(); // leave this or have decreaseQuality do the work?
    }
    else if (item.sell_in <= 5) {
      item.quality = increaseQuality(item.quality, 3);
    }
    else if (item.sell_in <= 10) {
      item.quality = increaseQuality(item.quality, 2);
    }
    else {
      item.quality = increaseQuality(item.quality); // is it confusing to pass in a number arg to the others but not this one?
    }
  }

  // conjured items will go here eventually


  else {
    // general items/standard items/normal items 
    if (item.quality > 0) {
      item.quality = decreaseQuality(item.quality);
    }
    if (item.sell_in < 0 && item.quality > 0) {
      item.quality = decreaseQuality(item.quality);
    }
  }
}

function updateSellIn(item) {
  if (item.name.toLowerCase().includes('sulfuras')) {
    return;
  }
  else {
    item.sell_in = decreaseSellIn(item.sell_in);
  }
}

export function update(items) {
  items.forEach(item => {
      updateQuality(item);
      updateSellIn(item);
  });
}
