window.onload = function() {
    // You might want to start with a template that uses GameStates:
    //     https://github.com/photonstorm/phaser/tree/master/resources/Project%20Templates/Basic
    
    // You can copy-and-paste the code from any of the examples at http://examples.phaser.io here.
    // You will need to change the fourth parameter to "new Phaser.Game()" from
    // 'phaser-example' to 'game', which is the id of the HTML element where we
    // want the game to go.
    // The assets (and code) can be found at: https://github.com/photonstorm/phaser/tree/master/examples/assets
    // You will need to change the paths you pass to "game.load.image()" or any other
    // loading functions to reflect where you are putting the assets.
    // All loading functions will typically all be found inside "preload()".
    
    "use strict";
    
    var game = new Phaser.Game( 800, 600, Phaser.AUTO, 'game', { preload: preload, create: create, update: update } );
    
    function preload() {
        //background image
        game.load.image('background', "assets/sprites/background.jpg");
        
        //ground platform image
        game.load.image('ground', "assets/sprites/block.jpg");
        
        //player sprite sheets for animations
        game.load.spritesheet('cat-death', "assets/sprites/cat-death.png", 572, 474, 10, 0, 0);
        game.load.spritesheet('cat-idle', "assets/sprites/cat-idle.png", 572, 474, 10, 0, 0);
        game.load.spritesheet('cat-jump', "assets/sprites/cat-jump.png", 572, 474);
        game.load.spritesheet('cat-run', "assets/sprites/cat-run.png", 572, 474);
        game.load.spritesheet('cat-walk', "assets/sprites/cat-walk.png", 572, 474, 10, 0, 0);
        
        //sprite sheet for different items spawned throughout the game
        game.load.spritesheet("red-flag", "assets/sprites/red-flag.png", 127, 129);
        game.load.image("coin", "assets/sprites/coin.png");
    }
    
    var player; //the player
    var cursors; //the input methods (keyboard inputs)
    var timeValue = 0;
    var timeText; //the time that has elapsed since the player started the game
    var score = 0; //the score a player accumulates during their play time
    var scoreText; //display for score value
    var startGame = false; //wait for user input to start game
    var spawnHazards = false; //wait for user input to begin spawning obstacles
    var coins; //group for coins
    var hazards; //group for obstacles
    var ground; //ground platform 
    var setVelocity = -100; //the starting speed of the game (goes in left direction)
    
    //Music and SFX
    var coinGrab; //collect coin
    var death; //sound of being hit by an obstacle
    var music; //background music
    var jumpSound; //jumping SFX
    var sounds; //list of all sounds
    
    function create() {        
        game.physics.startSystem(Phaser.Physics.ARCADE);
        
        game.add.sprite(0, 0, 'background');
        
        //make groups now
        coins = game.add.group(); coins.enableBody = true;
        hazards = game.add.group(); hazards.enableBody = true;
        
        ground = game.add.sprite(0, game.world.height - 64, 'ground');
        
        player = game.add.sprite(32, game.world.height - 150, 'cat'); player.frame = 37;
        game.physics.arcade.enable(player);
        
        //  Player physics properties. 
        player.scale.x -= 0.4;
        player.scale.y -= 0.4;
        player.body.bounce.y = 0;
        player.body.gravity.y = 150;
        player.body.collideWorldBounds = true;
        
        //animations of player
        player.animations.add('death', [0,1,2,3,4,5,6,7,8,9], 10, true);
        player.animations.add('fall', [10,11,12,13,15,6,17,18], 5, true);
        player.animations.add('jump', [39,40,41,42,43,44,45,46], 5, true);
        player.animations.add('run', [47,48,49,50,51,52,53,54], 10, true);
        
        game.time.events.loop(Phaser.Timer.SECOND, timerFunction, this); //counts elapsed time
        game.time.events.loop(Phaser.Timer.HALF, spawn, this); //spawns entities every half second
        
        //text for score and timer
        scoreText = game.add.text(16, 16, 
            'Score: ' + score, { fontSize: '32px', fill: '#000' });
        timeText = game.add.text(game.world.centerX - 16, 0, 
            'Elapsed Time: ' + timeValue, { fontSize: '32px', fill: '#000'});
        
        
        //***************************************************************************
        //left from template
        // Add some text using a CSS style.
        // Center it in X, and position its top 15 pixels from the top of the world.
        var style = { font: "25px Verdana", fill: "#9999ff", align: "center" };
        var text = game.add.text( game.world.centerX, 15, "click to start", style );
        text.anchor.setTo( 0.5, 0.0 );
        
        if (game.input.pointer.isDown == true) {
            text.kill(); //remove the text from the screen
            start();
        }
    }
    
    function update() {
        if (startGame) {
            player.velocity.x = -50; //always moving backwards unless they physically move forward
            
        }
    }
    
    function timerFunction() {
        //dependent on whether the player has started the game or not
        if (startGame) {
            timeValue++;
            timeText.setText('Elapsed Time: ' + timeValue);
            setVelocity -= 5; //increment velocity by 5 every second - increments in negative direction (left)
        }
    }
    //creates entities at random which kill the player and end the game or add to a score
    function spawn() {
        //doesn't spawn unless the game has started
        if (startGame) {
            var spawnType = Math.random(); //determines what we spawn, or if we don't spawn at all
            if (spawnType <= 0.3) {
                //spawn obstacle if x <= 0.3

            }
            else if (spawnType <= 0.75) {
                //spawn coin if 0.3 < x <= 0.75

            }
            else {
                //do nothing
                //left here for my sanity
            }
        }
    }
    
    function collectCoin(player, coin) {
        coin.kill();
        coinGrab.play(); //play the SFX for collecting a coin
        score += 10;
    }
    
    //starts the game by flipping boolean flags
    function start() {
        startGame = true;
        spawnHazards = true;
    }
    
    //ends the game by reseting boolean flags
    function end() {
        //stop all game functions
        game.input.enabled = false;
        spawnHazards = false;
        startGame = false; //this stops update()
        
        //add text to tell the player the game ended
        var text = game.add.text(game.world.centerX, game.world.centerY, 'GAME OVER', { font: "64px Arial", fill: "#ff0000", align: "center"} );
    }
};
