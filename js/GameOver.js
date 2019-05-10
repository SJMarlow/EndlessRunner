// Sebastian Marlow
// MarsScroller
// GameOver

var GameOver = function(game) {};

GameOver.prototype = {
	init: function(){
		finalScore = score;
	},

	create: function(){
		// Add the background and scale it to fit
		this.space = game.add.tileSprite(0, 0, 400, 400, 'background');
		this.space.scale.setTo(2.5, 2);
		// Add the title to the screen, centering it on X axis, and making it 1/3 from top in Y axis
		game.add.image((game.world.width - 331) / 2, (game.world.height - 139) / 3, 'sprites', 'gameOver');
		// Add play button
		game.add.button((game.world.width - 150) / 2, (game.world.height * 2) / 3, 'playButton', playPressed);

		// Add final score to screen
		this.finalScore = game.add.text(25, 25, 'Total Distance Traveled: ' + finalScore + ' m', {fontSize: '32px', fill: '#facade'});
	}

}

function playPressed(){

	game.state.start('GamePlay', false, true);

}