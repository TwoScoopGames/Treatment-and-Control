"use strict";

module.exports = function(ecs, data) { // eslint-disable-line no-unused-vars
	ecs.addEach(function(entity, elapsed) { // eslint-disable-line no-unused-vars
      var title = data.entities.entities[0];
      if (data.input.button("action")) {
        title.action = true;
      } else {
        if (title.action) {
          data.switchScene("day-intro");
        }
        title.action = false;
      }
	}, []);
};
