"use strict";

module.exports = function(ecs, data) { // eslint-disable-line no-unused-vars
	ecs.addEach(function(entity, context) { // eslint-disable-line no-unused-vars
		var x = 100;
      	var y = 500;
      
      	if (!entity.message) {
          return;
        }
		context.drawImage(data.images.get("textbox"), x, y);
      	context.fillStyle = "white";
		context.font = "50px mono";
		var msg = entity.message.text.substr(0, entity.message.len);
		context.fillText(msg, x + 50, y + 100);
	}, ["actionZone"]);
};
