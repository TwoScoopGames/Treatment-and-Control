"use strict";

function shuffle(o) {
    for (var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
}

var starterNames = [
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

module.exports = function(data) {
  data.sounds.play("day1", true);
  var names = starterNames.slice(0);
  shuffle(names);

  var nameMap = {};
  
  Object.keys(data.entities.entities).forEach(function(id) {
    var entity = data.entities.entities[id];
    if (entity.fadePercent === undefined) {
      return;
    }
    entity.name = names.pop();
    entity.fadePercent.fadePercent = 100;
    nameMap[entity.name] = entity.id;
  });

  var cart = data.entities.entities[3];

  cart.deliveries = [];

  var pillNames = starterNames.slice(0);
  shuffle(pillNames);
  for (var i = 0; i < 5; i++) {
    cart.deliveries.push({ name: pillNames[i], pill: "blue" });
    var worker = data.entities.entities[nameMap[pillNames[i]]];
    worker.fadePercent.fadePercent = 0;
  }
};
