"use strict";

function wrapText(renderer, text, x, y, maxWidth, lineHeight) {
	var words = text.split(" ");
	var line = "";

	for (var i = 0; i < words.length; i++) {
		var testLine = line + words[i] + " ";
		var metrics = renderer.measureText(testLine);
		var testWidth = metrics.width;
		if (testWidth > maxWidth && i > 0) {
			renderer.fillText(line, x, y);
			line = words[i] + " ";
			y += lineHeight;
		} else {
			line = testLine;
		}
	}
	renderer.fillText(line, x, y);
}

module.exports = function(ecs, game) { // eslint-disable-line no-unused-vars
	ecs.addEach(function renderPlayer(entity) { // eslint-disable-line no-unused-vars
		var x = 0;
		var y = 436;

		var target = game.entities.get(entity, "target");
		var clipboard = game.entities.get(entity, "clipboard");
		var message = game.entities.get(entity, "message");
		if (target && clipboard) {
			var cart = 3;
			var deliveries = game.entities.get(cart, "deliveries");

			game.renderer.drawSprite("clipboard-big.png", 400, 50);
			game.renderer.font = "24px minecraftia";
			game.renderer.fillStyle = "#666";

			for (var i = 0; i < deliveries.length; i++) {
				y = 200 + (i * 60);
				game.renderer.fillText(deliveries[i].name, 560, y + 45);
				game.renderer.drawSprite("pill-" + deliveries[i].pill + ".png", 510, y);
				if (deliveries[i].done) {
					game.renderer.drawSprite("strikeout.png", 480, y + 18);
				}
			}
		}
		if (message) {
			game.renderer.drawSprite("textbox-big.png", x, y);
			game.renderer.fillStyle = "white";
			game.renderer.font = "24px minecraftia";
			var msg = message.text.substr(0, message.len);
			wrapText(game.renderer, msg, x + 64, y + 64, 950, 30);
		}
	}, "actionZone");
};
