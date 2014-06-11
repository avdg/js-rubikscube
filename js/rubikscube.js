var rubiksCube = (function() {
	'use strict';

	function rubiksCube(cube, settings) {
		this.cube = cube;
		this.settings = settings;
	}

	// Returns a list of errors
	rubiksCube.prototype.validate = function() {
		var errors = [];

		this._validateFaces();

		// Check total types and total of each type
		var typeCount = {}; // Hashtable to keep track of types and how many of them
		for (var face in this.cube) {
			for (var i = 0; i < this.cube[face].length; i++) {
				for (var j = 0; j < this.cube[face][i].length; j++) {
					if (this.cube[face][i][j] in typeCount) {
						typeCount[this.cube[face][i][j]]++
					} else {
						typeCount[this.cube[face][i][j]] = 1;
					}
				}
			}
		}

		// Count number of types
		if (typeCount.length > 6) {
			errors[errors.length] = 'More than 6 types of stickers detected';
		}

		// Count number of stickers of each type
		var normalStickerCount = this.cube['r'].length * this.cube['r'].length;
		for (var type in typeCount) {
			if (typeCount[type] != normalStickerCount) {
				errors[errors.length] = 'Found ' + typeCount[type]
					+ ' stickers of type ' + type
					+ ', which does not match with the expected ' + normalStickerCount;
			}
		}

		return errors;
	}

	rubiksCube.prototype._validateFaces = function() {
		var faces = {f:true, b:true, l:true, r:true, t:true, d:true};
		var i = 0;
		for (var face in this.cube) {
			if (!(face in faces)) {
				throw "Face " + face + " is invalid";
			}
			i++;
		}

		// Check count
		if (i != 6) {
			throw "Found " + i + " faces on this cube, expecting 6";
		}
	}

	return rubiksCube;
})();

function getExampleCube() {
	return new rubiksCube({
		'f': [['w', 'w', 'w'], ['w', 'w', 'w'], ['w', 'w', 'w']],
		'b': [['y', 'y', 'y'], ['y', 'y', 'y'], ['y', 'y', 'y']],
		'l': [['b', 'b', 'b'], ['b', 'b', 'b'], ['b', 'b', 'b']],
		'r': [['g', 'g', 'g'], ['g', 'g', 'g'], ['g', 'g', 'g']],
		't': [['r', 'r', 'r'], ['r', 'r', 'r'], ['r', 'r', 'r']],
		'd': [['o', 'o', 'o'], ['o', 'o', 'o'], ['o', 'o', 'o']],
	});
}

if (!window.requestAnimationFrame) {
	window.requestAnimationFrame = (function() {
		return window.webkitRequestAnimationFrame ||
			window.mozRequestAnimationFrame ||
			window.oRequestAnimationFrame ||
			window.msRequestAnimationFrame ||
			function(callback) {
				window.setTimeout(callback, 1000 / 60);
			}
	})();
}