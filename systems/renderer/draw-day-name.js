"use strict";

module.exports = function(ecs, data) { // eslint-disable-line no-unused-vars
	ecs.add(function(entities, context) { // eslint-disable-line no-unused-vars
      context.font = "50px minecraftia";
      context.fillStyle = "#666";
      var day = data.arguments.day || 1;
	  context.fillText("DAY " + day, 300, 300);
	}, []);
};
