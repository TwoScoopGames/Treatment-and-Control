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

function showMessage(data, entity, message) {
  entity.message = { text: message, len: 0 };
  entity.timers.text.running = true;
  data.sounds.play("textpopup2");
}

module.exports = function(data) {
  var day = data.arguments.day || 0;
  data.sounds.play(songs[day], true);

  var cart = data.entities.entities[3];
  cart.deliveries = [];

  
  if (day === 0) {
    showMessage(data, data.entities.entities[11], "GUARD: The night shift left your cart over there.");
  }
  
  var worker = 0;
  Object.keys(data.entities.entities).forEach(function(id) {
    var entity = data.entities.entities[id];
    if (entity.fadePercent === undefined) {
      return;
    }
    
    var s = schedule[worker];
    entity.name = s.name;
    if (day === s.day) {
	    entity.fadePercent.fadePercent = 0;
      	var effective = s.unaffectedOn !== day
      	cart.deliveries.push({ name: s.name, pill: "blue", effective: effective });
    } else if (s.unaffectedOn < day) {
	    entity.fadePercent.fadePercent = 0;
      	if (s.unaffectedOn === day - 2) {
	      	cart.deliveries.push({ name: s.name, pill: "red", effective: true });
        }
      	if (s.unaffectedOn < day - 2) {
          entity.animation = undefined;
          entity.image = undefined;
          entity.message = { text: "I wonder where " + entity.name + " is..." };
        }
    } else {
	    entity.fadePercent.fadePercent = 100;
    }
    
    worker++;
  });
  shuffle(cart.deliveries);
};
