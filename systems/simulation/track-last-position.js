"use strict";

module.exports = function(ecs, data) { // eslint-disable-line no-unused-vars
	ecs.addEach(function(entity, elapsed) { // eslint-disable-line no-unused-vars
      entity.lastPosition = { x: entity.position.x, y: entity.position.y };
	}, ["position"]);
};
