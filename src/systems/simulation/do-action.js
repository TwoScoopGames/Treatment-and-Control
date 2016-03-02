"use strict";

var bluePillSounds = [
	"bluepills1.mp3",
	"bluepills2.mp3",
	"bluepills3.mp3",
	"bluepills4.mp3",
	"bluepills5.mp3",
	"bluepills6.mp3",
	"bluepills7.mp3",
	"bluepills8.mp3"
];
var responses = {
	"peopleGrey": [
		"...",
		"I need to get back to work.",
		"I'm not on your list.",
		"I must focus on my work.",
		"As a citizen it is my duty to be productive."
	],
	"peopleMedium": [
		"How are you today?",
		"Did you see the sunset last night?",
		"How is your family?",
		"This job is boring.",
		"This job is boring, I wish I could work at the refinery.",
		"Samuel hasn't showed up in a few days...",
		"I wish I was chosen to be a cook."
	],
	"peopleColorful": [
		"I don't think we really need these pills.",
		"I'm tired of this place.",
		"We aren't criminals, why are we treated like this?",
		"My brother was assigned to the refinery and we haven't seen him since.",
		"People are disappearing and nobody seems to care.",
		"How are you today?",
		"I haven't seen Tim in months, nobody seems to remember him... maybe I'm just imagining things...",
		"How is your family?",
		"This job is boring.",
		"This job is boring, but I am too old for the defence force.",
		"Anthony hasn't showed up in a few days...",
		"I wish I was chosen to be a cook."
	],
	"bluePill": [
		"Thanks.",
		"Time for my medicine?",
		"It's that time again.",
		"Can't they make these taste better?",
		"...",
		"If I have to...",
		"Do we really still need these?",
		"There hasen't been an incident in years, do we still need these pills?"
	],
	"bluePillSkeptical": [
		"If I have to...",
		"Do we really need these?",
		"There hasen't been an incident in years, do we still need these pills?"
	],
	"redPill": [
		"This is different than the usual pill.",
		"Are these a new flavor?",
		"What is this one for?",
		"They gave Tim one of these and he hasen't been back to work.",
		"Isn't this what Anthony takes? Where has he been...?"
	],
	"redPillSkeptical": [
		"They gave <name> one of these snd they havent been back to work.",
		"Isn't this what <name> takes? Where are they...?"
	]
};

function pickMessage(entity, other, cart, data) {
	var arr = ["..."];
	var fade = parseInt(data.entities.get(other, "fadePercent").fadePercent);
	if (fade === 0) {
		arr = responses.peopleColorful;
	} else if (fade === 50) {
		arr = responses.peopleMedium;
	} else if (fade === 100) {
		arr = responses.peopleGrey;
	}
	var target = data.entities.get(entity, "target");
	var otherName = data.entities.get(other, "name");
	var otherFadePercent = data.entities.get(other, "fadePercent");
	if (target && target.name === otherName) {
		if (target.pill === "blue") {
			arr = responses.bluePill;
			data.sounds.play(bluePillSounds[Math.floor(Math.random() * bluePillSounds.length)]);
		} else if (target.pill === "red") {
			arr = responses.redPill;
			data.sounds.play("redpill2.mp3");
		}

		var deliveries = data.entities.get(cart, "deliveries");
		for (var i = 0; i < deliveries.length; i++) {
			var d = deliveries[i];
			if (d.name === target.name) {
				d.done = true;
				if (d.effective) {
					otherFadePercent.fadePercent = 100;
				}
			}
		}
		data.entities.remove(entity, "target");
	}
	var msg = Math.floor(Math.random() * arr.length);
	return otherName.toUpperCase() + ": " + arr[msg];
}

function showMessage(data, entity, message) {
	data.entities.set(entity, "message", { text: message, len: 0 });
	data.entities.get(entity, "timers").text.running = true;
	data.sounds.play("textpopup2.mp3");
}

module.exports = function(ecs, data) { // eslint-disable-line no-unused-vars
	ecs.addEach(function doAction(entity, elapsed) { // eslint-disable-line no-unused-vars
		var cart = 3;
		var action = data.entities.get(entity, "action");
		var message = data.entities.get(entity, "message");
		var collisions = data.entities.get(entity, "collisions");

		if (data.inputs.button("action")) {
			var risingEdge = !action;
			data.entities.set(entity, "action", true);
			if (risingEdge) {
				if (message) {
					if (message.len < message.text.length) {
						message.len = message.text.length;
					} else {
						data.entities.remove(entity, "message");
						data.sounds.play("textpopup10.mp3");
					}
				} else if (data.entities.get(entity, "clipboard")) {
					data.entities.remove(entity, "clipboard");
					data.sounds.play("textpopup10.mp3");
				} else {
					for (var i = 0; i < collisions.length; i++) {
						var other = collisions[i];
						var otherMessage = data.entities.get(other, "message");
						var otherFadePercent = data.entities.get(other, "fadePercent");
						var otherDeliveries = data.entities.get(other, "deliveries");
						if (otherMessage) {
							showMessage(data, entity, otherMessage.text);
							break;
						}
						if (otherFadePercent) {
							showMessage(data, entity, pickMessage(entity, other, cart, data));
							break;
						}
						if (otherDeliveries) {
							var left = otherDeliveries.filter(function(d) {
								return !d.done;
							});
							if (left.length === 0) {
								//showMessage(data, entity, "No pills left");
								var day = data.arguments.day || 0;
								if (day === 4) {
									data.switchScene("ending");
								} else {
									data.switchScene("day-intro", { day: day + 1 });
								}
							} else {
								data.entities.set(entity, "target", left[0]);
								data.entities.set(entity, "clipboard", true);
								data.sounds.play("textpopup2.mp3");
							}
						}
					}
				}
			}
		} else {
			data.entities.set(entity, "action", false);
		}
	}, "actionZone");
};
