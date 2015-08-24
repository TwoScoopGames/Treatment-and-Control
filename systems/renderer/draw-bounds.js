"use strict";

module.exports = function(ecs, data) { // eslint-disable-line no-unused-vars
	ecs.addEach(function(entity, context) { // eslint-disable-line no-unused-vars
		context.strokeStyle = "red";
		context.strokeRect(entity.position.x, entity.position.y, entity.size.width, entity.size.height);
	}, ["position", "size"]);
};
