"use strict";

var footsteps = [
  "footsteps1",
  "footsteps2",
  "footsteps3",
  "footsteps4",
  "footsteps5",
  "footsteps6",
  "footsteps7",
  "footsteps8"
];

module.exports = function(entity, data) { // eslint-disable-line no-unused-vars
  data.sounds.play(footsteps[Math.floor(Math.random()*footsteps.length)]);
  entity.timers.footsteps.running = true;
};
