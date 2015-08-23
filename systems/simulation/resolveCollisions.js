"use strict";

function wasLeft(entity, other) {
  return entity.lastPosition.x + entity.size.width <= other.position.x;
}
function wasRight(entity, other) {
  return entity.lastPosition.x >= other.position.x + other.size.width;
}
function wasAbove(entity, other) {
  return entity.lastPosition.y + entity.size.height <= other.position.y;
}
function wasBelow(entity, other) {
  return entity.lastPosition.y >= other.position.y + other.size.height;
}

module.exports = function(ecs, data) { // eslint-disable-line no-unused-vars
	ecs.addEach(function(entity, elapsed) { // eslint-disable-line no-unused-vars
      for (var i = 0; i < entity.collisions.length; i++) {
        var other = data.entities.entities[entity.collisions[i]];
        if (other.actionZone) {
          continue;
        }
        if (wasLeft(entity, other)) {
          entity.position.x = other.position.x - entity.size.width;
          entity.velocity.x = 0;
        }
        if (wasRight(entity, other)) {
          entity.position.x = other.position.x + other.size.width;
          entity.velocity.x = 0;
        }
        if (wasAbove(entity, other)) {
          entity.position.y = other.position.y - entity.size.height;
          entity.velocity.y = 0;
        }
        if (wasBelow(entity, other)) {
          entity.position.y = other.position.y + other.size.height;
          entity.velocity.y = 0;
        }
      }
	}, ["collisions","velocity","player","lastPosition","position"]);
};
