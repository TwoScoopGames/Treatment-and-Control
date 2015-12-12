"use strict";

function setAnimation(animation, timers, animationName) {
	animation.speed = 1;
	timers.footsteps.running = true;
	if (animation.name === animationName) {
		return;
	}
	animation.name = animationName;
	animation.frame = 0;
	animation.time = 0;
}

module.exports = function(ecs, data) {
	ecs.addEach(function(entity, elapsed) { // eslint-disable-line no-unused-vars
		var velocity = data.entities.get(entity, "velocity");
		var animation = data.entities.get(entity, "animation");
		var timers = data.entities.get(entity, "timers");

		velocity.x = 0;
		velocity.y = 0;
		var speed = 0.2;
		animation.speed = 0;

		if (data.input.button("left")) {
			velocity.x = -speed;
			if (!data.input.button("up") && !data.input.button("down")) {
				setAnimation(animation, timers, "cartboy-walk-left-3x");
			}
		} else if (data.input.button("right")) {
			velocity.x = speed;
			if (!data.input.button("up") && !data.input.button("down")) {
				setAnimation(animation, timers, "cartboy-walk-right-3x");
			}
		}
		if (data.input.button("up")) {
			velocity.y = -speed;
			setAnimation(animation, timers, "cartboy-walk-up-3x");
		} else if (data.input.button("down")) {
			velocity.y = speed;
			setAnimation(animation, timers, "cartboy-walk-down-3x");
		}
		if (animation.speed === 0) {
			timers.footsteps.running = false;
			animation.frame = 0;
			animation.time = 0;
		}

		var boundsPosition = data.entities.get(6, "position");
		var boundsSize = data.entities.get(6, "size");
		var playerPosition = data.entities.get(entity, "position");
		var playerSize = data.entities.get(entity, "size");
		var playerRight = playerPosition.x + playerSize.width;
		var playerBottom = playerPosition.y + playerSize.height;
		var boundsRight = boundsPosition.x + boundsSize.width;
		var boundsBottom = boundsPosition.y + boundsSize.height;
		// left bounds
		if (playerPosition.x < boundsPosition.x) {
			playerPosition.x = boundsPosition.x;
		}
		// right bounds
		if (playerRight > boundsRight) {
			playerPosition.x = boundsRight - playerSize.width;
		}
		// top bounds
		if (playerPosition.y < boundsPosition.y) {
			playerPosition.y = boundsPosition.y;
		}
		// bottom bounds
		if (playerBottom > boundsBottom) {
			playerPosition.y = boundsBottom - playerSize.height;
		}
	}, "player");
};
