"use strict";

var footsteps = [
	"footsteps1",
	"footsteps2",
	"footsteps3",
	"footsteps4",
	"footsteps5",
	"footsteps6",
	"footsteps7",
	"footsteps8"
];

module.exports = function(entity, game) { // eslint-disable-line no-unused-vars
	game.sounds.play(footsteps[Math.floor(Math.random() * footsteps.length)]);
	game.entities.get(entity, "timers").footsteps.running = true;
};
