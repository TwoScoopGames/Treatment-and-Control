"use strict";

var sounds = [
"texttyping17",
"texttyping21",
/*
"texttyping1",
"texttyping10",
"texttyping11",
"texttyping12",
"texttyping13",
"texttyping14",
"texttyping15",
"texttyping16",
"texttyping17",
"texttyping18",
"texttyping19",
"texttyping2",
"texttyping20",
"texttyping21",
"texttyping22",
"texttyping23",
"texttyping24",
"texttyping25",
"texttyping3",
"texttyping4",
"texttyping5",
"texttyping6",
"texttyping7",
"texttyping8",
"texttyping9"*/
  ];
module.exports = function(entity, data) { // eslint-disable-line no-unused-vars
  entity.message.len++;
  if (entity.message.len === 1 || entity.message.text[entity.message.len - 1] === " ") {
    var i = Math.floor(Math.random() * sounds.length);
    data.sounds.play(sounds[i]);
  }
  if (entity.message.len < entity.message.text.length) {
    entity.timers.text.running = true;
  }
};
