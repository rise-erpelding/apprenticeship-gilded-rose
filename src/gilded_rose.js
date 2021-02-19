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

function produceUpdatedItem(item) {
  if (item.name.toLowerCase().includes('sulfuras')) {
    return item; // Question about return statements
  }

  if (item.name.toLowerCase().includes('aged brie')) {
    return item.sell_in < 0 ? 
      new Item(item.name,  decreaseSellIn(item.sell_in), increaseQuality(item.quality, 2)) :
      new Item(item.name,  decreaseSellIn(item.sell_in), increaseQuality(item.quality));
  } else if (item.name.toLowerCase().includes('backstage passes')) {
    if (item.sell_in <= 0) {
      return new Item(item.name, decreaseSellIn(item.sell_in), setQualityToZero());
    } else if (item.sell_in <= 5) {
      return new Item(item.name, decreaseSellIn(item.sell_in), increaseQuality(item.quality, 3));
    } else if (item.sell_in <= 10) {
      return new Item(item.name, decreaseSellIn(item.sell_in), increaseQuality(item.quality, 2));
    } else {
      return new Item(item.name, decreaseSellIn(item.sell_in), increaseQuality(item.quality));
    }
  } else if (item.name.toLowerCase().includes('conjured')) {
    return new Item(item.name, decreaseSellIn(item.sell_in), decreaseQuality(item.quality, 2));
  } else {
    // general items/standard items/normal items 
    if (item.quality <= 0) {
      return item;
    } else if (item.sell_in < 0) {
      return new Item(item.name, decreaseSellIn(item.sell_in), decreaseQuality(item.quality, 2));
    } else {
      return new Item(item.name, decreaseSellIn(item.sell_in), decreaseQuality(item.quality));
    }
  }
}

// function updateSellIn(item) {
//   if (item.name.toLowerCase().includes('sulfuras')) {
//     return;
//   }
//   else {
//     item.sell_in = decreaseSellIn(item.sell_in);
//   }
// }

export function update(items) {
  const updatedItems = [];
  items.forEach(item => {
      updatedItems.push(produceUpdatedItem(item));
  });
  return updatedItems;
}