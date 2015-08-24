"use strict";

var days = [ "MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY" ];
module.exports = function(ecs, data) { // eslint-disable-line no-unused-vars
	ecs.add(function(entities, context) { // eslint-disable-line no-unused-vars
      context.font = "50px minecraftia";
      context.fillStyle = "#666";
      var day = data.arguments.day || 1;
	  context.fillText(days[(day - 1) % 5], 300, 300);
	}, []);
};
