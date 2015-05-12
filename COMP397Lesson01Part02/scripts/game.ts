/// <reference path="typings/easeljs/easeljs.d.ts" />
/// <reference path="typings/tweenjs/tweenjs.d.ts" />
/// <reference path="typings/soundjs/soundjs.d.ts" />
/// <reference path="typings/preloadjs/preloadjs.d.ts" />

// Game Framework Variables
var canvas = document.getElementById("canvas");
var stage: createjs.Stage;
var assets: createjs.LoadQueue;

//Game Variables
var helloLabel: createjs.Text; //create a reference
var redButton: createjs.Bitmap;

function preload() {
    assets = new createjs.LoadQueue();
    assets.installPlugin(createjs.Sound);
    assets.on("complete", init, this);
    assets.loadManifest([{ id: "redButton", src: "assets/images/redButton.png" },
        { id: "Jump2", src: "assets/audio/Jump2.wav" }]);
}

function init() {
    stage = new createjs.Stage(canvas);
    stage.enableMouseOver(20); //count the number of times the mouse hover over the buttons
    createjs.Ticker.setFPS(60); // framerate for the game
    createjs.Ticker.on("tick", gameLoop);

    main();

}

//Our Main Game Loop refreshed - 60 fps
function gameLoop() {
    stage.update();
}
function redButtonClicked(event: createjs.MouseEvent) {
    console.log("clicked");
    createjs.Sound.play("Jump2");
}

function redButtonOver() {
    redButton.alpha = 0.8;
}

function redButtonMouseOut() {
    redButton.alpha = 0.1;
}


//Our Main Game Function
function main() {
    console.log("Game is Running");
    helloLabel = new createjs.Text("Hello World!", "40px Consolas", "#000000");

    helloLabel.regX = helloLabel.getMeasuredWidth() * 0.5;
    helloLabel.regY = helloLabel.getMeasuredHeight() * 0.5;
    helloLabel.x = 160;
    helloLabel.y = 190;

    stage.addChild(helloLabel);

    redButton = new createjs.Bitmap(assets.getResult("redButton"));
    redButton.regX = redButton.getBounds().width * 0.5;
    redButton.regY = redButton.getBounds().height * 0.5;

    redButton.x = 160;
    redButton.y = 270;
    stage.addChild(redButton);
    redButton.on("click", redButtonClicked);
    redButton.on("mouseover", redButtonOver);
    redButton.on("mouseout", redButtonMouseOut);

}


