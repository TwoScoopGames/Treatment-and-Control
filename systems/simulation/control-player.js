"use strict";

function setAnimation(entity, animation) {
	entity.animation.speed = 1;
  	if (entity.animation.name === animation) {
      return;
    }
	entity.animation.name = animation;
  	entity.animation.frame = 0;
  	entity.animation.time = 0;
}

module.exports = function(ecs, data) {
	ecs.addEach(function(entity, elapsed) { // jshint ignore:line
		entity.velocity.x = 0;
		entity.velocity.y = 0;
     	var speed = 0.2;
		if (data.input.button("left")) {
			entity.velocity.x = -speed;
			setAnimation(entity, "cartboy-walk-left-3x");
		} else if (data.input.button("right")) {
			entity.velocity.x = speed;
			setAnimation(entity, "cartboy-walk-right-3x");
		} else if (data.input.button("up")) {
			entity.velocity.y = -speed;
			setAnimation(entity, "cartboy-walk-up-3x");
		} else if (data.input.button("down")) {
			entity.velocity.y = speed;
			setAnimation(entity, "cartboy-walk-down-3x");
		} else {
	      	entity.animation.speed = 0;
          entity.animation.frame = 0;
          entity.animation.time = 0;
        }
      	if (data.input.button("action")) {
          var risingEdge = !entity.action;
          entity.action = true;
          if (risingEdge) {
            if (entity.message) {
              if (entity.message.len < entity.message.text.length) {
                entity.message.len = entity.message.text.length;
              } else {
              	entity.message = undefined;
                data.sounds.play("textpopup10");
              }
            } else {
              for (var i = 0; i < entity.collisions.length; i++) {
                var other = data.entities.entities[entity.collisions[i]];
                if (!other.message) {
                  continue;
                }
                entity.message = { text: other.message.text, len: 0 };
                entity.timers.text.running = true;
                data.sounds.play("textpopup2");
                break;
              }
            }
          }
        } else {
          entity.action = false;
        }
	}, ["player"]);
};
