// Sebastian Marlow
// Mars Scroller
// Main Menu

'use strict';

var game = new Phaser.Game(1000, 800, Phaser.AUTO, 'phaser');


var MainMenu = function(game) {};

MainMenu.prototype = {

	preload: function(){
		// Load in img Assets
		game.load.image('background', 'assets/img/background-black.png');
		game.load.atlas('sprites', 'assets/img/tileatlas.png', 'assets/img/sprites.json');
		game.load.image('playButton', 'assets/img/playButton.png');
		game.load.spritesheet('player', 'assets/img/shipFinal.png', 80, 98);
		game.load.audio('explosion', 'assets/audio/explosion.mp3');
		game.load.audio('backgroundMusic', 'assets/audio/BackgroundMusic.mp3');
	},
	create: function(){
		// Add the background and scale it to fit
		this.space = game.add.tileSprite(0, 0, 400, 400, 'background');
		this.space.scale.setTo(2.5, 2);
		// Add the title to the screen, centering it on X axis, and making it 1/3 from top in Y axis
		game.add.image((game.world.width - 331) / 2, (game.world.height - 139) / 3, 'sprites', 'title');
		// Add play button
		game.add.button((game.world.width - 150) / 2, (game.world.height * 2) / 3, 'playButton', playPressed);
		// Add controls text
		game.add.text((game.world.width - 375) / 2, game.world.height /2, 'Use Arrow Keys to Move', {fontSize: '32px', fill: '#facade', align: 'center'});
	},
	update: function(){
		// Move the tileSprite
		this.space.tilePosition.y += 1;
	}

}

function playPressed(){

	game.state.start('GamePlay', false, true);

}

game.state.add('MainMenu', MainMenu);
game.state.add('GamePlay', GamePlay);
game.state.add('GameOver', GameOver);
game.state.start('MainMenu');