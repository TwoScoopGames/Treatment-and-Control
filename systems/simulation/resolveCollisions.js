"use strict";

module.exports = function(ecs, data) { // eslint-disable-line no-unused-vars
	ecs.addEach(function(entity, elapsed) { // eslint-disable-line no-unused-vars
      for( var i = 0; i < entity.collisions.length; i++){
        var other = data.entities.entities[entity.collisions[i]];
        if(entity.velocity.y > 0 
           && (entity.position.y + entity.size.height) > other.position.y 
           && entity.position.y > other.position.y
          ){
          entity.position.y = other.position.y - entity.size.height;
          entity.velocity.y = 0;
        }
        if(entity.velocity.x > 0 
           && (entity.position.x + entity.size.width) > other.position.x 
           && entity.position.x > other.position.x
          ){
          entity.position.x = other.position.x - entity.size.width;
          entity.velocity.x = 0;
        } 
      }
	}, ["collisions","velocity"]);
};
