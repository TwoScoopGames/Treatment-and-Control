"use strict";

var days = [ "MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY" ];
module.exports = function(ecs, data) { // eslint-disable-line no-unused-vars
	ecs.add(function drawDayName(entities, context) { // eslint-disable-line no-unused-vars
		context.font = "50px minecraftia";
		context.fillStyle = "#666";
		var day = data.arguments.day || 0;
		context.fillText(days[day % 5], 300, 300);
	});
};
