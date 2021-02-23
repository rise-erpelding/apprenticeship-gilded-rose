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

// checks item.name against the category of item
function matchItemName(name, match) {
  return name.toLowerCase().includes(match);
}

function handleSulfuras(item) {
  if (matchItemName(item.name, 'sulfuras')) {
    return item;
  } else {
    return;
  }
}

function handleAgedBrie(item) {
  if (matchItemName(item.name, 'aged brie')) {
    return item.sell_in < 0 ? 
    new Item(item.name,  decreaseSellIn(item.sell_in), increaseQuality(item.quality, 2)) :
    new Item(item.name,  decreaseSellIn(item.sell_in), increaseQuality(item.quality));
  } else {
    return;
  }
}

function handleBackstagePasses(item) {
  if (matchItemName(item.name, 'backstage passes')) {
    if (item.sell_in <= 0) {
      return new Item(item.name, decreaseSellIn(item.sell_in), setQualityToZero());
    } else if (item.sell_in <= 5) {
      return new Item(item.name, decreaseSellIn(item.sell_in), increaseQuality(item.quality, 3));
    } else if (item.sell_in <= 10) {
      return new Item(item.name, decreaseSellIn(item.sell_in), increaseQuality(item.quality, 2));
    } else {
      return new Item(item.name, decreaseSellIn(item.sell_in), increaseQuality(item.quality));
    }
  } else {
    return;
  }
}

function handleConjuredItems(item) {
  if (matchItemName(item.name, 'conjured')) {
    return item.sell_in < 0 ? 
      new Item(item.name, decreaseSellIn(item.sell_in), decreaseQuality(item.quality, 4)) :
      new Item(item.name, decreaseSellIn(item.sell_in), decreaseQuality(item.quality, 2));
  } else {
    return;
  }
}

function handleNormalItems(item) {
  if (item.quality <= 0) {
    return new Item(item.name, decreaseSellIn(item.sell_in), setQualityToZero());
  } else if (item.sell_in < 0) {
    return new Item(item.name, decreaseSellIn(item.sell_in), decreaseQuality(item.quality, 2));
  } else {
    return new Item(item.name, decreaseSellIn(item.sell_in), decreaseQuality(item.quality));
  }
}

function produceUpdatedItem(item) {

  let updatedItem;
  const specialItemActions = [handleSulfuras, handleAgedBrie, handleBackstagePasses, handleConjuredItems];
  specialItemActions.forEach(action => {
    // runs through each of the functions for special items first
    // the functions for special items will return undefined if those rules don't apply to the item
    // update the value of updatedItem if running the action returns an object (aka if it doesn't return undefined)
    if (typeof action(item) === 'object') {
      updatedItem = action(item);
      return updatedItem;
    }
  });

  // if updatedItem is still undefined (aka if it's not an object) then it's a normal item, not a special item
  // run the normal item function to apply normal item rules
  if (typeof updatedItem !== 'object') {
    updatedItem = handleNormalItems(item);
  }
  // now we've either applied rules for a special item or a normal item so updatedItem should be defined, so return that value to update()
  return updatedItem;
}

export function update(items) {
  const updatedItems = [];
  items.forEach(item => {
      updatedItems.push(produceUpdatedItem(item));
  });
  return updatedItems;
}
