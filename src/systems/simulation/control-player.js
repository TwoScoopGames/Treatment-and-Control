"use strict";

function setAnimation(entity, animation) {
	entity.animation.speed = 1;
	entity.timers.footsteps.running = true;
	if (entity.animation.name === animation) {
		return;
	}
	entity.animation.name = animation;
	entity.animation.frame = 0;
	entity.animation.time = 0;
}

module.exports = function(ecs, data) {
	ecs.addEach(function(entity, elapsed) { // eslint-disable-line no-unused-vars
		entity.velocity.x = 0;
		entity.velocity.y = 0;
		var speed = 0.2;
		entity.animation.speed = 0;

		if (data.input.button("left")) {
			entity.velocity.x = -speed;
			if (!data.input.button("up") && !data.input.button("down")) {
				setAnimation(entity, "cartboy-walk-left-3x");
			}
		} else if (data.input.button("right")) {
			entity.velocity.x = speed;
			if (!data.input.button("up") && !data.input.button("down")) {
				setAnimation(entity, "cartboy-walk-right-3x");
			}
		}
		if (data.input.button("up")) {
			entity.velocity.y = -speed;
			setAnimation(entity, "cartboy-walk-up-3x");
		} else if (data.input.button("down")) {
			entity.velocity.y = speed;
			setAnimation(entity, "cartboy-walk-down-3x");
		}
		if (entity.animation.speed === 0) {
			entity.timers.footsteps.running = false;
			entity.animation.frame = 0;
			entity.animation.time = 0;
		}

		var bounds = data.entities.entities[6];
		var player = entity;
		var playerRight = player.position.x + player.size.width;
		var playerBottom = player.position.y + player.size.height;
		var boundsRight = bounds.position.x + bounds.size.width;
		var boundsBottom = bounds.position.y + bounds.size.height;
		// left bounds
		if( player.position.x < bounds.position.x){
			player.position.x = bounds.position.x;
		}
		// right bounds
		if( playerRight > boundsRight){
			player.position.x = boundsRight - player.size.width;
		}
		// top bounds
		if( player.position.y < bounds.position.y){
			player.position.y = bounds.position.y;
		}
		// bottom bounds
		if( playerBottom > boundsBottom){
			player.position.y = boundsBottom - player.size.height;
		}
	}, ["player"]);
};
