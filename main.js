"use strict";

var shaders = require("./shaders");

function initShaders(gl) {
	var shaderNames = [ "shader-fs", "shader-vs" ];
	var s = shaderNames.map(shaders.get.bind(undefined, gl));

	var vertexAttribArrays = {
		vertexPositionAttribute: "aVertexPosition",
		textureCoordAttribute: "aTextureCoord"
	};

	var uniformVars = {
		pMatrixUniform: "uPMatrix",
		mvMatrixUniform: "uMVMatrix",
		samplerUniform: "uSampler"
	};
	return shaders.link(gl, s, vertexAttribArrays, uniformVars);
}

function buildBuffer(gl, size, vertices) {
	var buffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
	buffer.itemSize = size;
	buffer.numItems = vertices.length / size;
	return buffer;
}


var mat4 = require("gl-matrix").mat4;

var mvMatrix = mat4.create();
var pMatrix = mat4.create();

function drawScene(gl, shaderProgram, squareVertexPositionBuffer, spriteName) {
	gl.viewport(0, 0, canvas.width, canvas.height);
	gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
	mat4.perspective(pMatrix, 45 * Math.PI / 180.0, canvas.width / canvas.height, 0.1, 100.0);

	mat4.identity(mvMatrix);

	mat4.translate(mvMatrix, mvMatrix, [1.5, 0.0, -7.0]);
	gl.bindBuffer(gl.ARRAY_BUFFER, squareVertexPositionBuffer);
	gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, squareVertexPositionBuffer.itemSize, gl.FLOAT, false, 0, 0);

	var sprite = sprites[spriteName];
	if (sprite) {
		var coords = sprite.coords
		gl.bindBuffer(gl.ARRAY_BUFFER, coords);
		gl.vertexAttribPointer(shaderProgram.textureCoordAttribute, coords.itemSize, gl.FLOAT, false, 0, 0);
		gl.activeTexture(gl.TEXTURE0);
		gl.bindTexture(gl.TEXTURE_2D, sprite.texture);
		gl.uniform1i(shaderProgram.samplerUniform, 0);
	}

	setMatrixUniforms(gl);
	gl.drawArrays(gl.TRIANGLE_STRIP, 0, squareVertexPositionBuffer.numItems);
}

function setMatrixUniforms(gl) {
	gl.uniformMatrix4fv(shaderProgram.pMatrixUniform, false, pMatrix);
	gl.uniformMatrix4fv(shaderProgram.mvMatrixUniform, false, mvMatrix);
}

var textureJson = require("./images/test-spritesheet.json");
var sprites = {};
function initTexture(gl) {
	var image = new Image();
	image.onload = function() {
		var texture = imageToTexture(gl, image);
		sprites = parseSpritesFromTexture(gl, texture, textureJson);
	}
	image.src = "images/test-spritesheet.png";
}

function imageToTexture(gl, image) {
	var texture = gl.createTexture();
	gl.bindTexture(gl.TEXTURE_2D, texture);
	gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
	gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
	gl.bindTexture(gl.TEXTURE_2D, null);
	texture.width = image.width;
	texture.height = image.height;
	return texture;
}

function parseSpritesFromTexture(gl, texture, json) {
	return json.frames.reduce(function(sprites, frame) {
		var left = frame.frame.x / texture.width;
		var top = 1.0 - (frame.frame.y / texture.height);
		var right = (frame.frame.x + frame.frame.w) / texture.width;
		var bottom = (texture.height - frame.frame.y - frame.frame.h) / texture.height;
		sprites[frame.filename] = {
			texture: texture,
			coords: buildBuffer(gl, 2, [
				right, top,
				left, top,
				right, bottom,
				left, bottom
			]),
			width: frame.frame.w,
			height: frame.frame.h
		};

		return sprites;
	}, sprites);
}

var canvas = document.getElementById("canvas");
var gl = canvas.getContext("webgl");
if (!gl) {
	console.error("Failed to initialize WebGL");
}
var shaderProgram = initShaders(gl);
var squareVertexPositionBuffer = buildBuffer(gl, 3, [
	 1.0,  1.0,  0.0, // top right
	-1.0,  1.0,  0.0, // top left
	 1.0, -1.0,  0.0, // bottom right
	-1.0, -1.0,  0.0 // bottom left
]);
initTexture(gl);
gl.clearColor(0.0, 0.0, 0.0, 1.0);
gl.enable(gl.DEPTH_TEST);
function render() {
	drawScene(gl, shaderProgram, squareVertexPositionBuffer, "cartboy.png");
	window.requestAnimationFrame(render);
}
window.requestAnimationFrame(render);
