var app = new PIXI.Application(window.innerWidth - 20, window.innerHeight - 20, { antialias: true });
document.body.appendChild(app.view);

app.stage.interactive = true;

// create some textures from an image path
var textureButton = PIXI.Texture.fromImage('https://dl.dropboxusercontent.com/s/mi2cibdajml8qj9/arrow_wait.png?dl=0');
var textureButtonDown = PIXI.Texture.fromImage('https://dl.dropboxusercontent.com/s/m0x11c91wazehyp/arrow_error.png?dl=0');
var textureButtonOver = PIXI.Texture.fromImage('https://dl.dropboxusercontent.com/s/1kuhddt8p9tr0k8/arrow_wait.png?dl=0');

    var button = new PIXI.Sprite(textureButton);
    button.buttonMode = true;

    button.anchor.set(0.5);
    button.x = 200;
    button.y = 200;

    // make the button interactive...
    button.interactive = true;
    button.buttonMode = true;

    button
        // Mouse & touch events are normalized into
        // the pointer* events for handling different
        // button events.
        .on('pointerdown', onButtonDown)
        .on('pointerup', onButtonUp)
        .on('pointerupoutside', onButtonUp)
        .on('pointerover', onButtonOver)
        .on('pointerout', onButtonOut);

        // Use mouse-only events
        // .on('mousedown', onButtonDown)
        // .on('mouseup', onButtonUp)
        // .on('mouseupoutside', onButtonUp)
        // .on('mouseover', onButtonOver)
        // .on('mouseout', onButtonOut)

        // Use touch-only events
        // .on('touchstart', onButtonDown)
        // .on('touchend', onButtonUp)
        // .on('touchendoutside', onButtonUp)

    // add it to the stage
    app.stage.addChild(button);

var incr = 0;	
	
	
function onButtonDown() {
    this.isdown = true;
    this.texture = textureButtonDown;
    this.alpha = 1;

}

function onButtonUp() {
   
    if (this.isOver && this.isdown) {
		
		incr ++;
			window.alert(incr);
        this.texture = textureButtonOver;
    }
    else {
        this.texture = textureButton;
    }
	this.isdown = false;
}

function onButtonOver() {
    this.isOver = true;
    if (this.isdown) {
        return;
    }
    this.texture = textureButtonOver;
}

function onButtonOut() {
    this.isOver = false;
    if (this.isdown) {
        return;
    }
    this.texture = textureButton;
}


// let's create a moving shape
var thing = new PIXI.Graphics();
app.stage.addChild(thing);
thing.x = 800/2;
thing.y = 600/2;

var count = 0;

// Just click on the stage to draw random lines
app.stage.on('pointertap', onClick);

function onClick() {
    graphics.lineStyle(Math.random() * 30, Math.random() * 0xFFFFFF, 1);
    graphics.moveTo(Math.random() * 800, Math.random() * 600);
	window.alert('arsar');
    graphics.bezierCurveTo(
        Math.random() * 800, Math.random() * 600,
        Math.random() * 800, Math.random() * 600,
        Math.random() * 800, Math.random() * 600
    );
}

app.ticker.add(function() {

    count += 0.1;

    thing.clear();
    thing.lineStyle(10, 0xff0000, 1);
    thing.beginFill(0xffFF00, 0.5);

    thing.moveTo(-120 + Math.sin(count) * 20, -100 + Math.cos(count)* 20);
    thing.lineTo( 120 + Math.cos(count) * 20, -100 + Math.sin(count)* 20);
    thing.lineTo( 120 + Math.sin(count) * 20, 100 + Math.cos(count)* 20);
    thing.lineTo( -120 + Math.cos(count)* 20, 100 + Math.sin(count)* 20);
    thing.lineTo( -120 + Math.sin(count) * 20, -100 + Math.cos(count)* 20);

    thing.rotation = count * 0.1;
});