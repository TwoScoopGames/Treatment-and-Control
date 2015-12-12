"use strict";

var anims = {
	100: {
		"worker-1": "worker-1-f3",
		"worker-2": "worker-2-f3",
		"worker-3": "worker-3-f3",
		"worker-4": "worker-4-f3"
	},
	50: {
		"worker-1": "worker-1-fade50-f3",
		"worker-2": "worker-2-fade50-f3",
		"worker-3": "worker-3-fade50-f3",
		"worker-4": "worker-4-fade50-f3"
	},
	0: {
		"worker-1": "worker-1-fade0-f3",
		"worker-2": "worker-2-fade0-f3",
		"worker-3": "worker-3-fade0-f3",
		"worker-4": "worker-4-fade0-f3"
	}
};

module.exports = function(ecs, data) { // eslint-disable-line no-unused-vars
	data.entities.registerSearch("setWorkerAnimation", ["fadePercent", "animation"]);
	ecs.addEach(function(entity, elapsed) { // eslint-disable-line no-unused-vars
		var fadePercent = data.entities.get(entity, "fadePercent");
		var animation = data.entities.get(entity, "animation");
		var fade = fadePercent.fadePercent;
		if (animation === undefined) {
			return;
		}
		var anim = animation.name.substr(0, 8);
		animation.name = anims[fade][anim];
	}, "setWorkerAnimation");
};
