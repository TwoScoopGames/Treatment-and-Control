"use strict";

var anims = {
  100: {
    "worker-1": "worker-1",
    "worker-2": "worker-2",
    "worker-3": "worker-3",
    "worker-4": "worker-4",
  },
  50: {
    "worker-1": "worker-1-fade50",
    "worker-2": "worker-2-fade50",
    "worker-3": "worker-3-fade50",
    "worker-4": "worker-4-fade50",
  },
  0: {
    "worker-1": "worker-1-fade0",
    "worker-2": "worker-2-fade0",
    "worker-3": "worker-3-fade0",
    "worker-4": "worker-4-fade0",
  }
};

module.exports = function(ecs, data) { // eslint-disable-line no-unused-vars
	ecs.addEach(function(entity, elapsed) { // eslint-disable-line no-unused-vars
      var fade = entity.fadePercent.fadePercent;
      var anim = entity.animation.name.substr(0, 8);      
      entity.animation.name = anims[fade][anim];
	}, ["fadePercent"]);
};
