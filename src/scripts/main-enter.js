"use strict";

function shuffle(o) {
	for (var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
	return o;
}

var names = [
	"Alex",
	"Eric",
	"Allen",
	"Jeffrey",
	"David",
	"Rex",
	"Clay",
	"Sai",
	"Chris",
	"Barry",
	"Loi",
	"Cara",
	"Tiffani",
	"Stephen",
	"Tyler",
	"Brad",
	"Benjamin",
	"Jules",
	"Aaron",
	"Mark"
];

var songs = ["day1", "day2", "day3", "day4", "day4"];

shuffle(names);
var schedule = names.map(function(name, i) {
	return {
		name: name,
		day: i % 5
	};
});
schedule[0].unaffectedOn = 0;
schedule[2].unaffectedOn = 2;
shuffle(schedule);

function showMessage(game, entity, message) {
	game.entities.set(entity, "message", { text: message, len: 0 });
	game.entities.get(entity, "timers").text.running = true;
	game.sounds.play("textpopup2");
}

module.exports = function(game) {
	var day = game.arguments.day || 0;
	game.sounds.play(songs[day], true);

	var cart = 3;
	var deliveries = [];
	game.entities.set(cart, "deliveries", deliveries);

	if (day === 0) {
		showMessage(game, 11, "GUARD: The night shift left your cart over there.");
	}

	var worker = 0;
	game.entities.find("fadePercent").forEach(function(entity) {
		var s = schedule[worker];
		game.entities.set(entity, "name", s.name);
		if (day === s.day) {
			game.entities.set(entity, "fadePercent", { fadePercent: 0 });
			var effective = s.unaffectedOn !== day;
			deliveries.push({ name: s.name, pill: "blue", effective: effective });
		} else if (s.unaffectedOn < day) {
			game.entities.set(entity, "fadePercent", { fadePercent: 0 });
			if (s.unaffectedOn === day - 2) {
				deliveries.push({ name: s.name, pill: "red", effective: true });
			}
			if (s.unaffectedOn < day - 2) {
				game.entities.remove(entity, "animation");
				game.entities.remove(entity, "image");
				game.entities.set(entity, "message", { text: "I wonder where " + entity.name + " is..." });
			}
		} else {
			game.entities.set(entity, "fadePercent", { fadePercent: 100 });
		}

		worker++;
	});
	shuffle(deliveries);
};
