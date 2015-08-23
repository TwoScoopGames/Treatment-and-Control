"use strict";

module.exports = function(entity, data) { // eslint-disable-line no-unused-vars
  entity.message.len++;
  if (entity.message.len < entity.message.text.length) {
    entity.timers.text.running = true;
  }
};
