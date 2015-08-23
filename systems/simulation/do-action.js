"use strict";

module.exports = function(ecs, data) { // eslint-disable-line no-unused-vars
	ecs.addEach(function(entity, elapsed) { // eslint-disable-line no-unused-vars
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
            } else {
              for (var i = 0; i < entity.collisions.length; i++) {
                var other = data.entities.entities[entity.collisions[i]];
                if (!other.message) {
                  continue;
                }
                entity.message = { text: other.message.text, len: 0 };
                entity.timers.text.running = true;
                data.sounds.play("textpopup2");
                break;
              }
            }
          }
        } else {
          entity.action = false;
        }
	}, ["actionZone"]);
};
