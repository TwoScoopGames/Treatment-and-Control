"use strict";

var footsteps = [
	"footsteps1.mp3",
	"footsteps2.mp3",
	"footsteps3.mp3",
	"footsteps4.mp3",
	"footsteps5.mp3",
	"footsteps6.mp3",
	"footsteps7.mp3",
	"footsteps8.mp3"
];

module.exports = function(entity, data) { // eslint-disable-line no-unused-vars
	data.sounds.play(footsteps[Math.floor(Math.random() * footsteps.length)]);
	data.entities.get(entity, "timers").footsteps.running = true;
};
