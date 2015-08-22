"use strict";

function compileShader(gl, type, src) {
	if (!type) {
		console.error("Invalid shader type: " + type);
		return null;
	}
	var shader = gl.createShader(gl[type]);
	gl.shaderSource(shader, src);
	gl.compileShader(shader);
	if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
		console.error(gl.getShaderInfoLog(shader));
		return null;
	}
	return shader;
}

var shaderTypes = {
	"x-shader/x-fragment": "FRAGMENT_SHADER",
	"x-shader/x-vertex": "VERTEX_SHADER"
};

function getShader(gl, id) {
	var shaderScript = document.getElementById(id);
	if (!shaderScript) {
		return null;
	}

	var src = shaderScript.textContent;
	return compileShader(gl, shaderTypes[shaderScript.type], src);
}

function initShaders(gl) {
	var fragmentShader = getShader(gl, "shader-fs");
	var vertexShader = getShader(gl, "shader-vs");

	var shaderProgram = gl.createProgram();
	gl.attachShader(shaderProgram, vertexShader);
	gl.attachShader(shaderProgram, fragmentShader);
	gl.linkProgram(shaderProgram);

	if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
		console.error("Could not initialise shaders");
	}

	gl.useProgram(shaderProgram);

	shaderProgram.vertexPositionAttribute = gl.getAttribLocation(shaderProgram, "aVertexPosition");
	gl.enableVertexAttribArray(shaderProgram.vertexPositionAttribute);

	shaderProgram.textureCoordAttribute = gl.getAttribLocation(shaderProgram, "aTextureCoord");
	gl.enableVertexAttribArray(shaderProgram.textureCoordAttribute);

	shaderProgram.pMatrixUniform = gl.getUniformLocation(shaderProgram, "uPMatrix");
	shaderProgram.mvMatrixUniform = gl.getUniformLocation(shaderProgram, "uMVMatrix");
	shaderProgram.samplerUniform = gl.getUniformLocation(shaderProgram, "uSampler");

	return shaderProgram;
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

function drawScene(gl, shaderProgram, triangleVertexPositionBuffer, squareVertexPositionBuffer, texture, textureCoords) {
	gl.viewport(0, 0, canvas.width, canvas.height);
	gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
	mat4.perspective(pMatrix, 45 * Math.PI / 180.0, canvas.width / canvas.height, 0.1, 100.0);

	mat4.identity(mvMatrix);

	mat4.translate(mvMatrix, mvMatrix, [-1.5, 0.0, -7.0]);
	// gl.bindBuffer(gl.ARRAY_BUFFER, triangleVertexPositionBuffer);
	// gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, triangleVertexPositionBuffer.itemSize, gl.FLOAT, false, 0, 0);
	// setMatrixUniforms(gl);
	// gl.drawArrays(gl.TRIANGLES, 0, triangleVertexPositionBuffer.numItems);

	mat4.translate(mvMatrix, mvMatrix, [3.0, 0.0, 0.0]);
	gl.bindBuffer(gl.ARRAY_BUFFER, squareVertexPositionBuffer);
	gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, squareVertexPositionBuffer.itemSize, gl.FLOAT, false, 0, 0);

	gl.bindBuffer(gl.ARRAY_BUFFER, textureCoords);
	gl.vertexAttribPointer(shaderProgram.textureCoordAttribute, textureCoords.itemSize, gl.FLOAT, false, 0, 0);
	gl.activeTexture(gl.TEXTURE0);
	gl.bindTexture(gl.TEXTURE_2D, texture);
	gl.uniform1i(shaderProgram.samplerUniform, 0);

	setMatrixUniforms(gl);
	gl.drawArrays(gl.TRIANGLE_STRIP, 0, squareVertexPositionBuffer.numItems);
}

function setMatrixUniforms(gl) {
	gl.uniformMatrix4fv(shaderProgram.pMatrixUniform, false, pMatrix);
	gl.uniformMatrix4fv(shaderProgram.mvMatrixUniform, false, mvMatrix);
}

function initTexture(gl) {
	var texture = gl.createTexture();
	var image = new Image();
	image.onload = function() {
		handleLoadedTexture(gl, texture, image);
	}
	image.src = "images/eggplant.png";
	return texture;
}

function handleLoadedTexture(gl, texture, image) {
	gl.bindTexture(gl.TEXTURE_2D, texture);
	gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
	gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
	// gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
	// gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

	gl.bindTexture(gl.TEXTURE_2D, null);
}

var canvas = document.getElementById("canvas");
var gl = canvas.getContext("webgl");
if (!gl) {
	console.error("Failed to initialize WebGL");
}
var shaderProgram = initShaders(gl);
var triangleVertexPositionBuffer = buildBuffer(gl, 3, [
	 0.0,  1.0,  0.0,
	-1.0, -1.0,  0.0,
	 1.0, -1.0,  0.0
]);
var squareVertexPositionBuffer = buildBuffer(gl, 3, [
	 1.0,  1.0,  0.0, // top right
	-1.0,  1.0,  0.0, // top left
	 1.0, -1.0,  0.0, // bottom right
	-1.0, -1.0,  0.0 // bottom left
]);
var textureCoords = buildBuffer(gl, 2, [
	1.0, 1.0,
	0.0, 1.0,
	1.0, 0.0,
	0.0, 0.0,
]);
var texture = initTexture(gl);
gl.clearColor(0.0, 0.0, 0.0, 1.0);
gl.enable(gl.DEPTH_TEST);
function render() {
	drawScene(gl, shaderProgram, triangleVertexPositionBuffer, squareVertexPositionBuffer, texture, textureCoords);
	window.requestAnimationFrame(render);
}
window.requestAnimationFrame(render);
