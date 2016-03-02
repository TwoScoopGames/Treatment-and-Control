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

var songs = ["day1.mp3", "day2.mp3", "day3.mp3", "day4.mp3", "day4.mp3"];

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

function showMessage(data, entity, message) {
	data.entities.set(entity, "message", { text: message, len: 0 });
	data.entities.get(entity, "timers").text.running = true;
	data.sounds.play("textpopup2.mp3");
}

module.exports = function(data) {
	var day = data.arguments.day || 0;
	data.sounds.play(songs[day], true);

	var cart = 3;
	var deliveries = [];
	data.entities.set(cart, "deliveries", deliveries);

	if (day === 0) {
		showMessage(data, 11, "GUARD: The night shift left your cart over there.");
	}

	var worker = 0;
	data.entities.find("fadePercent").forEach(function(entity) {
		var s = schedule[worker];
		data.entities.set(entity, "name", s.name);
		if (day === s.day) {
			data.entities.set(entity, "fadePercent", { fadePercent: 0 });
			var effective = s.unaffectedOn !== day;
			deliveries.push({ name: s.name, pill: "blue", effective: effective });
		} else if (s.unaffectedOn < day) {
			data.entities.set(entity, "fadePercent", { fadePercent: 0 });
			if (s.unaffectedOn === day - 2) {
				deliveries.push({ name: s.name, pill: "red", effective: true });
			}
			if (s.unaffectedOn < day - 2) {
				data.entities.remove(entity, "animation");
				data.entities.remove(entity, "image");
				data.entities.set(entity, "message", { text: "I wonder where " + entity.name + " is..." });
			}
		} else {
			data.entities.set(entity, "fadePercent", { fadePercent: 100 });
		}

		worker++;
	});
	shuffle(deliveries);
};
