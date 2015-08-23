"use strict";

module.exports = function(data) {
  data.sounds.play("day1", true);
  
  var cart = data.entities.entities[3];
  
  cart.deliveries = [
    { name: "Rex", pill: "blue" }
  ];
};
