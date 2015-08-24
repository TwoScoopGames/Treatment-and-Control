"use strict";

var day = 0;

module.exports = function(ecs, data) { // eslint-disable-line no-unused-vars
  day++;
	ecs.add(function(entities, context) { // eslint-disable-line no-unused-vars
      context.font = "50px minecraftia";
      context.fillStyle = "#666";
	  context.fillText("DAY " + day, 300, 300);
	}, []);
};
