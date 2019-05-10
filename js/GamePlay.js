// Sebastian Marlow
// MarsScroller
// GamePlay

'use strict';

var GamePlay = function(game) {};
var player;
var asteroids;
var health;
var healthBar;
var score = 0;
GamePlay.prototype = {

	create: function(){
		// Add physics
		game.physics.startSystem(Phaser.Physics.ARCADE);

		// Add sounds
		this.explosion = game.add.audio('explosion');
		this.backgroundMusic = game.add.audio('backgroundMusic');
		this.backgroundMusic.play('', 0, 1, true);

		// Create background and player
		this.space = game.add.tileSprite(0, 0, 400, 400, 'background');
		this.space.scale.setTo(2.5, 2);

		player = game.add.sprite((game.world.width) / 2, (game.world.height) * 8.5 / 10, 'player');

		player.animations.add('flying');

		player.animations.play('flying', 20, true);

		// Give the player physics, and keep them inside of the play area
		game.physics.arcade.enable(player);
		player.body.collideWorldBounds = true;
		player.body.immovable = true;

		// Define pivot for player, the point which they will rotate around
		player.pivot.x = 50;
		player.pivot.y = 45;

		// Define the asteroids group
		asteroids = game.add.group();
		asteroids.enableBody = true;
		game.physics.arcade.enable(asteroids);

		// Make asteroids group die when out of bounds
		asteroids.checkWorldBounds = true;
		asteroids.outOfBoundsKill = true;

		// Health shown in the top right
		health = 5;
		game.add.text(25, 125, 'Health:', {fontSize: '24px', fill: '#facade'})
		healthBar = game.add.image(25, 150, 'sprites', 'horizontal_bar_red');
		healthBar.scale.setTo(health * 0.75, 1);

		// Add score to the game
		this.scoreText = game.add.text(25, 25, 'Distance Traveled:\n0m', {fontSize: '32px', fill: '#facade'});
		score = 0;




	},

	update: function(){

		// Move the tileSprite
		this.space.tilePosition.y += 5;

		// Get input from the Keyboard
		var cursors = game.input.keyboard.createCursorKeys();

		// Collision Test between asteroids and player
		game.physics.arcade.collide(player, asteroids, BOOM, null, this);

		// Resets the players angle when they aren't moving
		if (player.body.velocity.x < 30 && player.body.velocity.x > -30){
			player.rotation = 0;
		}

		// Test for player input
		if (cursors.left.isDown){
			// Move left and tilt left
			player.body.velocity.x = -200;
			player.rotation = -0.262;
		}

		else if (cursors.right.isDown){
			// Move right and tilt right
			player.body.velocity.x = 200;
			player.rotation = 0.262;
		}

		else{
			// Slow player down when not trying to move
			player.body.velocity.x = player.body.velocity.x * 97 / 100;
		}

		// Every tick there is a 1 percent chance that an asteroid will spawn
		if (Math.random() * 100 < 5){
			//Spawn an asteroid
			spawnAsteroid();
		}

		score += 77;
		this.scoreText.text = 'Distance Traveled:\n' + score + ' m';

	}
}

function spawnAsteroid(){
	// Both Big asteroids and small asteroids will spawn
	var asteroidX = Math.random() * game.world.width
	if(Math.random() < 0.3){
		// Spawn a big asteroid at the top of the screen at a random X val
		var asteroid = asteroids.create(asteroidX, 0, 'sprites', 'asteroid_grey');
	}
	else{
		// Spawn a small asteroid at the top of the screen at a random X val
		var asteroid = asteroids.create(asteroidX, 0, 'sprites', 'asteroid_grey_tiny');
	}

	// Give the asteroid some velocity
	asteroid.body.velocity.y = Math.random() * 300 + 100;
}

function BOOM(player, asteroid){
	// Destroys asteroid and lowers players health by 1
	asteroid.kill();
	health -= 1;

	this.explosion.play();

	// Redraws healthBar
	healthBar.kill();
	healthBar = game.add.image(25, 150, 'sprites', 'horizontal_bar_red');
	healthBar.scale.setTo(health * 0.75, 1);

	// Checks to see if player is dead
	if (health <= 0){
		// GameOver :(
		game.state.start('GameOver', false, true, score);
		this.backgroundMusic.stop();
	}
}