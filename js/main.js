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
        
        game.load.image('background', "assets/sprites/background.png");
        
        //player sprite sheets for animations
        game.load.spritesheet("cat", "assets/sprites/cat.png", 572, 474);
        
        //sprite sheet for different items spawned throughout the game
        game.load.spritesheet("items", "assets/sprites/items.png", 127, 129);
    }
    
    var player; //the player
    var cursors; //the input methods (keyboard inputs)
    var timeText; //the time that has elapsed since the player started the game
    var score; //the score a player accumulates during their play time
    var scoreText; //display for score value
    var startGame = false; //wait for user input to start game
    var spawnHazards = false; //wait for user input to begin spawning obstacles
    
    function create() {
        var pointer = new Pointer(this, 1, CURSOR);
        
        game.physics.startSystem(Phaser.Physics.ARCADE);
        
        
        
        
        
        //***************************************************************************
        //left from template
        // Add some text using a CSS style.
        // Center it in X, and position its top 15 pixels from the top of the world.
        var style = { font: "25px Verdana", fill: "#9999ff", align: "center" };
        var text = game.add.text( game.world.centerX, 15, "click to start", style );
        text.anchor.setTo( 0.5, 0.0 );
        
        if (pointer.isDown == true) {
            start();
        }
    }
    
    function update() {
        if (startGame) {
            
        }
    }
    
    //creates entities at random which kill the player and end the game or add to a score
    function spawn() {
        var spawnGood = Math.random(); //if < 0.5, then spawn good item, else spawn obstacle
        if (spawnGood < 0.5) {
            //then we spawn a coin
        }
        else {
            //spawn a flag obstacle
        }
    }
    
    function collectCoin(player, coin) {
        
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
    }
};
