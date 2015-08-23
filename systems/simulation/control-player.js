"use strict";

module.exports = function(ecs, data) {
	ecs.addEach(function(entity, elapsed) { // jshint ignore:line
		entity.velocity.x = 0;
		entity.velocity.y = 0;
     	var speed = 0.2;
		if (data.input.button("left")) {
			entity.velocity.x = -speed;
		}
		if (data.input.button("right")) {
			entity.velocity.x = speed;
		}
		if (data.input.button("up")) {
			entity.velocity.y = -speed;
		}
		if (data.input.button("down")) {
			entity.velocity.y = speed;
		}
      	if (data.input.button("action")) {
          for (var i = 0; i < entity.collisions.length; i++) {
            var other = data.entities.entities[entity.collisions[i]];
            if (!other.message) {
              continue;
            }
            entity.message = { text: other.message.text };
          }
        }
	}, ["player"]);
};
