"use strict";

module.exports = function(entity, game) { // eslint-disable-line no-unused-vars
	game.switchScene("main", { day: (game.arguments.day || 0) });
};
