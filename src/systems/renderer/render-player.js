"use strict";

function wrapText(context, text, x, y, maxWidth, lineHeight) {
	var words = text.split(" ");
	var line = "";

	for(var i = 0; i < words.length; i++) {
		var testLine = line + words[i] + " ";
		var metrics = context.measureText(testLine);
		var testWidth = metrics.width;
		if (testWidth > maxWidth && i > 0) {
			context.fillText(line, x, y);
			line = words[i] + " ";
			y += lineHeight;
		}
		else {
			line = testLine;
		}
	}
	context.fillText(line, x, y);
}


module.exports = function(ecs, data) { // eslint-disable-line no-unused-vars
	ecs.addEach(function(entity, context) { // eslint-disable-line no-unused-vars
		var x = 0;
		var y = 436;

		var target = data.entities.get(entity, "target");
		var clipboard = data.entities.get(entity, "clipboard");
		var message = data.entities.get(entity, "message");
		if (target && clipboard) {
			var cart = 3;
			var deliveries = data.entities.get(cart, "deliveries");

			context.drawImage(data.images.get("clipboard-big"), 400, 50);
			context.font = "24px minecraftia";
			context.fillStyle = "#666";

			for (var i = 0; i < deliveries.length; i++) {
				y = 200 + (i * 60);
				context.fillText(deliveries[i].name, 560, y + 45);
				context.drawImage(data.images.get("pill-" + deliveries[i].pill), 510, y);
				if (deliveries[i].done) {
					context.drawImage(data.images.get("strikeout"), 480, y + 18);
				}
			}
		}
		if (message) {
			context.drawImage(data.images.get("textbox-big"), x, y);
			context.fillStyle = "white";
			context.font = "24px minecraftia";
			var msg = message.text.substr(0, message.len);
			wrapText(context, msg, x + 64, y + 64, 950, 30);
		}

	}, "actionZone");
};
