"use strict";

module.exports = function(ecs, data) { // eslint-disable-line no-unused-vars
	ecs.addEach(function(entity, context) { // eslint-disable-line no-unused-vars
		context.drawImage(data.images.get("textbox"), 100, 100);
      	context.fillStyle = "red";
		context.font = "50px sans-serif";
		context.fillText(entity.message.text, 200, 200);
	}, ["player", "message"]);
};
