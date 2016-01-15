"use strict";

module.exports = function(ecs, game) { // eslint-disable-line no-unused-vars
	game.entities.registerSearch("drawBounds", ["position", "size"]);
	ecs.addEach(function drawBounds(entity, context) { // eslint-disable-line no-unused-vars
		var position = game.entities.get(entity, "position");
		var size = game.entities.get(entity, "position");
		context.strokeStyle = "red";
		context.strokeRect(position.x, position.y, size.width, size.height);
	}, "drawBounds");
};
