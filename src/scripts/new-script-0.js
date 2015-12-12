"use strict";

var sounds = [
	"texttyping17",
	"texttyping21"
];
module.exports = function(entity, data) { // eslint-disable-line no-unused-vars
	var message = data.entities.get(entity, "message");
	var timers = data.entities.get(entity, "timers");
	message.len++;
	if (message.len === 1 || message.text[message.len - 1] === " ") {
		var i = Math.floor(Math.random() * sounds.length);
		data.sounds.play(sounds[i]);
	}
	if (message.len < message.text.length) {
		timers.text.running = true;
	}
};
