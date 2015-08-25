"use strict";

function line(context, x1, y1, x2, y2, color, width) {
  context.beginPath();
  context.moveTo(x1, y1);
  context.lineTo(x2, y2);
  context.lineWidth = width;
  context.strokeStyle = color;
  context.stroke();
}

function wrapText(context, text, x, y, maxWidth, lineHeight) {
  var words = text.split(" ");
  var line = "";

  for(var i = 0; i < words.length; i++) {
    var testLine = line + words[i] + ' ';
    var metrics = context.measureText(testLine);
    var testWidth = metrics.width;
    if (testWidth > maxWidth && i > 0) {
      context.fillText(line, x, y);
      line = words[i] + " ";
      y += lineHeight;
    }
    else {
    	line = testLine;
    }
  }
  context.fillText(line, x, y);
}
      

module.exports = function(ecs, data) { // eslint-disable-line no-unused-vars
	ecs.addEach(function(entity, context) { // eslint-disable-line no-unused-vars
		var x = 0;
      	var y = 436;
      
      if (entity.target && entity.clipboard) {
          var cart = data.entities.entities[3];

	      context.drawImage(data.images.get("clipboard-big"), 400, 50);
          context.font = "24px minecraftia";
          context.fillStyle = "#666";
        
        	for (var i = 0; i < cart.deliveries.length; i++) {
              	var y = 200 + (i * 60);
          		context.fillText(cart.deliveries[i].name, 560, y + 45);
              	context.drawImage(data.images.get("pill-" + cart.deliveries[i].pill), 510, y);
              if (cart.deliveries[i].done) {
                context.drawImage(data.images.get("strikeout"), 480, y + 18);
              }
            }
      }
      	if (entity.message) {      
          context.drawImage(data.images.get("textbox-big"), x, y);
          context.fillStyle = "white";
          context.font = "24px minecraftia";
          var msg = entity.message.text.substr(0, entity.message.len);
          wrapText(context, msg, x + 64, y + 64, 950, 30);
        }

	}, ["actionZone"]);
};
