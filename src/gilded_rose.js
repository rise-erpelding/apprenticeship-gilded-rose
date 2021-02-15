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

function increaseQuality(currQuality, incAmount) {
  if (currQuality >= 50) {
    return 50;
  }
  return currQuality + incAmount;
}

function setQualityToZero() {
  return 0;
}

function decrementSellIn(itemSellIn) {
  return itemSellIn - 1;
}

function updateQuality(item) {
  // updates the quality for all items
  if (item.name.toLowerCase().includes('sulfuras')) {
    // sulfuras "never has to be sold nor does it decrease in quality"
    return;
  }
  if (item.name.toLowerCase().includes('aged brie')) {
    /*
     * aged brie increases in quality the older it gets
     * it didn't explicitly say anywhere that aged brie increases in quality double after sell_in is 0, but this is the way it behaved in the original function
     */
    item.quality = increaseQuality(item.quality, 1);
    if (item.sell_in < 0) {
      item.quality = increaseQuality(item.quality, 1);
    }
  }
  else if (item.name.toLowerCase().includes('backstage passes')) {
    /* 
    * "Backstage passes" increases in quality as its sell_in value decreases
    * quality increases by 2 when there are 10 days or less
    * and by 3 when there are 5 days or less
    * but quality drops to 0 after the concert
    */
    item.quality = increaseQuality(item.quality, 1);
    if (item.sell_in < 11) {
      item.quality = increaseQuality(item.quality, 1);
    }
    if (item.sell_in < 6) {
      item.quality = increaseQuality(item.quality, 1);
    }
    if (item.sell_in <= 0) {
      item.quality = setQualityToZero();
    }
  }
  // conjured items will go here eventually


  else {
    // general items/standard items/normal items 
    if (item.quality > 0) {
      item.quality = decrementQuality(item.quality);
    }
    if (item.sell_in < 0 && item.quality > 0) {
      item.quality = decrementQuality(item.quality);
    }
  }
}

function updateSellIn(item) {
  if (item.name.toLowerCase().includes('sulfuras')) {
    return;
  }
  else {
    item.sell_in = decrementSellIn(item.sell_in);
  }
}

export function update(items) {
  // this function updates the inventory each day
  items.forEach(item => {
      updateQuality(item);
      updateSellIn(item);
  });
}
