"use strict";

var days = [ "MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY" ];
module.exports = function(ecs, game) { // eslint-disable-line no-unused-vars
	ecs.add(function drawDayName(entities) { // eslint-disable-line no-unused-vars
		game.renderer.font = "50px minecraftia";
		game.renderer.fillStyle = "#666";
		var day = game.arguments.day || 0;
		game.renderer.fillText(days[day % 6], 300, 300);
	});
};
