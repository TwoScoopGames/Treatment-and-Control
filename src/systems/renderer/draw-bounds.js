"use strict";

module.exports = function(ecs, data) { // eslint-disable-line no-unused-vars
	data.entities.registerSearch("drawBounds", ["position", "size"]);
	ecs.addEach(function drawBounds(entity, context) { // eslint-disable-line no-unused-vars
		var position = data.entities.get(entity, "position");
		var size = data.entities.get(entity, "position");
		context.strokeStyle = "red";
		context.strokeRect(position.x, position.y, size.width, size.height);
	}, "drawBounds");
};
