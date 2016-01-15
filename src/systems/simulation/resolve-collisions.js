"use strict";

function wasLeft(entityLastPosition, entitySize, otherPosition) {
	return entityLastPosition.x + entitySize.width <= otherPosition.x;
}
function wasRight(entityLastPosition, otherPosition, otherSize) {
	return entityLastPosition.x >= otherPosition.x + otherSize.width;
}
function wasAbove(entityLastPosition, entitySize, otherPosition) {
	return entityLastPosition.y + entitySize.height <= otherPosition.y;
}
function wasBelow(entityLastPosition, otherPosition, otherSize) {
	return entityLastPosition.y >= otherPosition.y + otherSize.height;
}

module.exports = function(ecs, game) { // eslint-disable-line no-unused-vars
	game.entities.registerSearch("resolveCollisions", ["collisions","velocity","player","lastPosition","position"]);
	ecs.addEach(function resolveCollisions(entity, elapsed) { // eslint-disable-line no-unused-vars
		var entityCollisions = game.entities.get(entity, "collisions");
		var entityPosition = game.entities.get(entity, "position");
		var entitySize = game.entities.get(entity, "size");
		var entityVelocity = game.entities.get(entity, "velocity");
		var entityLastPosition = game.entities.get(entity, "lastPosition");

		for (var i = 0; i < entityCollisions.length; i++) {
			var other = entityCollisions[i];
			var otherActionZone = game.entities.get(other, "actionZone");
			var otherImage = game.entities.get(other, "image");
			var otherPosition = game.entities.get(other, "position");
			var otherSize = game.entities.get(other, "size");

			if (otherActionZone || otherImage === undefined) {
				continue;
			}
			if (wasLeft(entityLastPosition, entitySize, otherPosition)) {
				entityPosition.x = otherPosition.x - entitySize.width;
				entityVelocity.x = 0;
			}
			if (wasRight(entityLastPosition, otherPosition, otherSize)) {
				entityPosition.x = otherPosition.x + otherSize.width;
				entityVelocity.x = 0;
			}
			if (wasAbove(entityLastPosition, entitySize, otherPosition)) {
				entityPosition.y = otherPosition.y - entitySize.height;
				entityVelocity.y = 0;
			}
			if (wasBelow(entityLastPosition, otherPosition, otherSize)) {
				entityPosition.y = otherPosition.y + otherSize.height;
				entityVelocity.y = 0;
			}
		}
	}, "resolveCollisions");
};
