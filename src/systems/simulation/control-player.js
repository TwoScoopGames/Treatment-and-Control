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

module.exports = function(ecs, game) {
	ecs.addEach(function controlPlayer(entity, elapsed) { // eslint-disable-line no-unused-vars
		var velocity = game.entities.get(entity, "velocity");
		var animation = game.entities.get(entity, "animation");
		var timers = game.entities.get(entity, "timers");

		velocity.x = 0;
		velocity.y = 0;
		var speed = 0.2;
		animation.speed = 0;

		if (game.input.button("left")) {
			velocity.x = -speed;
			if (!game.input.button("up") && !game.input.button("down")) {
				setAnimation(animation, timers, "cartboy-walk-left-3x");
			}
		} else if (game.input.button("right")) {
			velocity.x = speed;
			if (!game.input.button("up") && !game.input.button("down")) {
				setAnimation(animation, timers, "cartboy-walk-right-3x");
			}
		}
		if (game.input.button("up")) {
			velocity.y = -speed;
			setAnimation(animation, timers, "cartboy-walk-up-3x");
		} else if (game.input.button("down")) {
			velocity.y = speed;
			setAnimation(animation, timers, "cartboy-walk-down-3x");
		}
		if (animation.speed === 0) {
			timers.footsteps.running = false;
			animation.frame = 0;
			animation.time = 0;
		}

		var boundsPosition = game.entities.get(6, "position");
		var boundsSize = game.entities.get(6, "size");
		var playerPosition = game.entities.get(entity, "position");
		var playerSize = game.entities.get(entity, "size");
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
