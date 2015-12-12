"use strict";

module.exports = function(ecs, data) { // eslint-disable-line no-unused-vars
	ecs.add(function(entities, elapsed) { // eslint-disable-line no-unused-vars
		var title = 0;
		if (data.input.button("action")) {
			data.entities.set(title, "action", true);
		} else {
			if (data.entities.get(title, "action")) {
				data.switchScene("day-intro");
			}
			data.entities.set(title, "action", false);
		}
	});
};
