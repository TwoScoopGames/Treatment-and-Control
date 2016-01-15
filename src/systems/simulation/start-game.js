"use strict";

module.exports = function(ecs, game) { // eslint-disable-line no-unused-vars
	ecs.add(function startGame(entities, elapsed) { // eslint-disable-line no-unused-vars
		var title = 0;
		if (game.input.button("action")) {
			game.entities.set(title, "action", true);
		} else {
			if (game.entities.get(title, "action")) {
				game.switchScene("day-intro");
			}
			game.entities.set(title, "action", false);
		}
	});
};
