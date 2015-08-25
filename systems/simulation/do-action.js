"use strict";

var bluePillSounds = [
  "bluepills1",
  "bluepills2",
  "bluepills3",
  "bluepills4",
  "bluepills5",
  "bluepills6",
  "bluepills7",
  "bluepills8"
];
var responses = {
  "peopleGrey":
  [
    "...",
    "I need to get back to work.",
    "I'm not on your list."
  ],
  "peopleMedium":
  [
    "How are you today?",
    "Did you see the sunset last night?",
    "How is your family?",
    "This job is boring.",
    "This job is boring, I wish I could work at the refinery.",
    "<name> hasn't showed up in a few days...",
    "I wish I was chosen to be a cook."
  ],
  "peopleColorful":
  [
    "I don't think we really need these pills.",
    "I'm tired of this place.",
    "We aren't criminals, why are we treated like this?",
    "My brother was assigned to the refinery and we haven't seen him since.",
    "People are dissapearing and nobody seems to care."
  ],
  "bluePill":
  [
    "Thanks.",
    "Time for my medicine?",
    "It's that time again.",
    "Can't they make these taste better?",
    "..."
  ],
  "bluePillSkeptical":
  [
    "If I have to...",
    "Do we really need these?",
    "There hasen't been an incident in years, do we still need these pills?"
  ],
  "redPill":
  [
    "This is different than the usual pill.",
    "Are these a new flavor?",
    "What is this one for?"
  ],
  "redPillSkeptical":
  [
    "They gave <name> one of these snd they havent been back to work.",
    "Isn't this what <name> takes? Where are they...?"
  ],
};

function pickMessage(entity, other, cart, data) {
  var arr = ["..."];
  var fade = parseInt(other.fadePercent.fadePercent);
  if (fade === 0) {
    arr = responses.peopleColorful;
  } else if (fade === 50) {
    arr = responses.peopleMedium;
  } else if (fade === 100) {
    arr = responses.peopleGrey;
  }
  if (entity.target && entity.target.name === other.name) {
    if (entity.target.pill === "blue") {
      arr = responses.bluePill;
      data.sounds.play(bluePillSounds[Math.floor(Math.random() * bluePillSounds.length)]);
    } else if (entity.target.pill === "red") {
      arr = responses.redPill;
      data.sounds.play(redPill2);
    }

    for (var i = 0; i < cart.deliveries.length; i++) {
      var d = cart.deliveries[i];
      if (d.name === entity.target.name) {
        d.done = true;
        if (d.effective) {
		    other.fadePercent.fadePercent = 100;
        }
      }
    }
    entity.target = undefined;

  }
  var i = Math.floor(Math.random() * arr.length);
  return other.name.toUpperCase() + ": " + arr[i];
}

function showMessage(data, entity, message) {
  entity.message = { text: message, len: 0 };
  entity.timers.text.running = true;
  data.sounds.play("textpopup2");
}

module.exports = function(ecs, data) { // eslint-disable-line no-unused-vars
	ecs.addEach(function(entity, elapsed) { // eslint-disable-line no-unused-vars
      var cart = data.entities.entities[3];

        if (data.input.button("action")) {
          var risingEdge = !entity.action;
          entity.action = true;
          if (risingEdge) {
            if (entity.message) {
              if (entity.message.len < entity.message.text.length) {
                entity.message.len = entity.message.text.length;
              } else {
              	entity.message = undefined;
                data.sounds.play("textpopup10");
              }
            } else if (entity.clipboard) {
                entity.clipboard = undefined;
                data.sounds.play("textpopup10");
            } else {
              for (var i = 0; i < entity.collisions.length; i++) {
                var other = data.entities.entities[entity.collisions[i]];
                if (other.message) {
                  showMessage(data, entity, other.message.text);
                  break;
                }
                if (other.fadePercent) {
                  showMessage(data, entity, pickMessage(entity, other, cart, data));
                  break;
                }
                if (other.deliveries) {
                  var left = other.deliveries.filter(function(d) {
                    return !d.done;
                  });
                  if (left.length === 0) {
	                  //showMessage(data, entity, "No pills left");
                    var day = data.arguments.day || 0;
                    data.switchScene("day-intro", {day: day + 1 });
                  } else {
                   	  entity.target = left[0];
	                    entity.clipboard = true;
                      data.sounds.play("textpopup2");
                  }
                }
              }
            }
          }
        } else {
          entity.action = false;
        }
	}, ["actionZone"]);
};
