"use strict";

var songs = ["day1", "day2", "day3", "day4", "day4"];

module.exports = function(game) {
	var day = game.arguments.day || 0;
	game.sounds.stop(songs[day]);
};
