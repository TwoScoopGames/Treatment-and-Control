"use strict";

var sounds = [
	"texttyping17",
	"texttyping21"
];
module.exports = function(entity, data) { // eslint-disable-line no-unused-vars
	entity.message.len++;
	if (entity.message.len === 1 || entity.message.text[entity.message.len - 1] === " ") {
		var i = Math.floor(Math.random() * sounds.length);
		data.sounds.play(sounds[i]);
	}
	if (entity.message.len < entity.message.text.length) {
		entity.timers.text.running = true;
	}
};
