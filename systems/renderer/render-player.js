"use strict";

module.exports = function(ecs, data) { // eslint-disable-line no-unused-vars
	ecs.addEach(function(entity, context) { // eslint-disable-line no-unused-vars
		var x = 0;
      	var y = 436;
      
      	if (!entity.message) {
          return;
        }
		context.drawImage(data.images.get("textbox-big"), x, y);
      	context.fillStyle = "white";
		context.font = "24px minecraftia";
		var msg = entity.message.text.substr(0, entity.message.len);
		context.fillText(msg, x + 64, y + 64);
	}, ["actionZone"]);
};
