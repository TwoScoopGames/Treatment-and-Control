"use strict";

var sounds = [
	"texttyping17",
	"texttyping21"
];
module.exports = function(entity, game) { // eslint-disable-line no-unused-vars
	var message = game.entities.get(entity, "message");
	var timers = game.entities.get(entity, "timers");
	message.len++;
	if (message.len === 1 || message.text[message.len - 1] === " ") {
		var i = Math.floor(Math.random() * sounds.length);
		game.sounds.play(sounds[i]);
	}
	if (message.len < message.text.length) {
		timers.text.running = true;
	}
};
