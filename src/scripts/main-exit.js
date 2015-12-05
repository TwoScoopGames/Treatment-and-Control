"use strict";

var songs = ["day1", "day2", "day3", "day4", "day4"];

module.exports = function(data) {
	var day = data.arguments.day || 0;
	data.sounds.stop(songs[day]);
};
