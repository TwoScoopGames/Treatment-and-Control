"use strict";

module.exports = function(ecs, data) { // eslint-disable-line no-unused-vars
	ecs.addEach(function(entity, context) { // eslint-disable-line no-unused-vars
      	if (!entity.message) {
          return;
        }
		context.drawImage(data.images.get("textbox"), 100, 100);
      	context.fillStyle = "red";
		context.font = "50px sans-serif";
		var msg = entity.message.text.substr(0, entity.message.len);
		context.fillText(msg, 200, 200);
	}, ["player", "message"]);
};
