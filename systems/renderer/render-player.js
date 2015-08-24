"use strict";

function line(context, x1, y1, x2, y2, color, width) {
  context.beginPath();
  context.moveTo(x1, y1);
  context.lineTo(x2, y2);
  context.lineWidth = width;
  context.strokeStyle = color;
  context.stroke();
}

module.exports = function(ecs, data) { // eslint-disable-line no-unused-vars
	ecs.addEach(function(entity, context) { // eslint-disable-line no-unused-vars
		var x = 0;
      	var y = 436;
      
      if (entity.target && entity.clipboard) {
          var cart = data.entities.entities[3];

	      context.drawImage(data.images.get("clipboard-big"), 400, 50);
          context.font = "24px minecraftia";
          context.fillStyle = "#666";
        
        	for (var i = 0; i < cart.deliveries.length; i++) {
              	var y = 200 + (i * 60);
          		context.fillText(cart.deliveries[i].name, 560, y + 45);
              	context.drawImage(data.images.get("pill-" + cart.deliveries[i].pill), 510, y);
              if (cart.deliveries[i].done) {
                context.drawImage(data.images.get("strikeout"), 480, y + 18);
              }
            }
      }
      	if (entity.message) {      
          context.drawImage(data.images.get("textbox-big"), x, y);
          context.fillStyle = "white";
          context.font = "24px minecraftia";
          var msg = entity.message.text.substr(0, entity.message.len);
          context.fillText(msg, x + 64, y + 64);
        }

	}, ["actionZone"]);
};
