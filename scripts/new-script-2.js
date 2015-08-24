"use strict";

module.exports = function(entity, data) { // eslint-disable-line no-unused-vars
  data.switchScene("main", { day: (data.arguments.day || 1) });
};