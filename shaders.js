"use strict";

function compile(gl, type, src) {
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

function get(gl, id) {
	var shaderScript = document.getElementById(id);
	if (!shaderScript) {
		return null;
	}

	var src = shaderScript.textContent;
	return compile(gl, shaderTypes[shaderScript.type], src);
}

module.exports = {
	compile: compile,
	get: get
};
