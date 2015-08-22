"use strict";

var shaders = require("./shaders");
var textures = require("./textures");

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

var mat4 = require("gl-matrix").mat4;

var mvMatrix = mat4.create();
var pMatrix = mat4.create();

var cx = 0.0;
var cy = 0.0;

function drawScene(gl, shaderProgram) {
	gl.viewport(0, 0, canvas.width, canvas.height);
	gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
	mat4.perspective(pMatrix, 45 * Math.PI / 180.0, canvas.width / canvas.height, 0.1, 100.0);

	var camera = mat4.create();
	mat4.translate(camera, camera, [-cx, -cy, -7.0]);

	mat4.copy(mvMatrix, camera);
	mat4.translate(mvMatrix, mvMatrix, [-1.5, 0.0, 0.0]);
	drawSprite(gl, shaderProgram, sprites["desk.png"]);

	mat4.copy(mvMatrix, camera);
	mat4.translate(mvMatrix, mvMatrix, [1.5, 0.0, 0.0]);
	drawSprite(gl, shaderProgram, sprites["cartboy.png"]);

	cx += 0.01;
	cy -= 0.01;
}

function drawSprite(gl, shaderProgram, sprite) {
	if (!sprite) {
		return;
	}

	gl.bindBuffer(gl.ARRAY_BUFFER, sprite.vertexCoords);
	gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, sprite.vertexCoords.itemSize, gl.FLOAT, false, 0, 0);

	var coords = sprite.textureCoords
	gl.bindBuffer(gl.ARRAY_BUFFER, coords);
	gl.vertexAttribPointer(shaderProgram.textureCoordAttribute, coords.itemSize, gl.FLOAT, false, 0, 0);
	gl.activeTexture(gl.TEXTURE0);
	gl.bindTexture(gl.TEXTURE_2D, sprite.texture);
	gl.uniform1i(shaderProgram.samplerUniform, 0);

	setMatrixUniforms(gl);
	gl.drawArrays(gl.TRIANGLE_STRIP, 0, sprite.vertexCoords.numItems);
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
		var texture = textures.fromImage(gl, image);
		sprites = textures.toSprites(gl, texture, textureJson);
	}
	image.src = "images/test-spritesheet.png";
}

var canvas = document.getElementById("canvas");
var gl = canvas.getContext("webgl");
if (!gl) {
	console.error("Failed to initialize WebGL");
}
var shaderProgram = initShaders(gl);
initTexture(gl);
gl.clearColor(0.0, 0.0, 0.0, 1.0);
gl.enable(gl.DEPTH_TEST);
gl.depthFunc(gl.LESS);
gl.blendFunc(gl.SRC_ALPHA, gl.ONE);
gl.enable(gl.BLEND);
function render() {
	drawScene(gl, shaderProgram);
	window.requestAnimationFrame(render);
}
window.requestAnimationFrame(render);
