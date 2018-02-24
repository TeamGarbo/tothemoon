
var coins = 0;
var clickAmount = 1;
var mineAmount = 1;


var app = new PIXI.Application(window.innerWidth - 20, window.innerHeight - 20, {
		backgroundColor: 0x1099bb
	}, {
		antialias: true
	});
document.body.appendChild(app.view);

app.stage.interactive = true;

// create some textures from an image path
var textureButton = PIXI.Texture.fromImage('https://raw.githubusercontent.com/TeamGarbo/tothemoon/master/res/buttonup.png');
var textureButtonDown = PIXI.Texture.fromImage('https://raw.githubusercontent.com/TeamGarbo/tothemoon/master/res/buttondown.png');
var textureButtonOver = PIXI.Texture.fromImage('https://raw.githubusercontent.com/TeamGarbo/tothemoon/master/res/buttonup.png');

var button = new PIXI.Sprite(textureButton);
button.buttonMode = true;

button.anchor.set(0.5);
button.x = 200;
button.y = 200;

// make the button interactive...
button.interactive = true;
button.buttonMode = true;

button
.on('pointerdown', onButtonDown)
.on('pointerup', onButtonUp)
.on('pointerupoutside', onButtonUp)
.on('pointerover', onButtonOver)
.on('pointerout', onButtonOut);

// add it to the stage
app.stage.addChild(button);

var countingText = new PIXI.Text('COUNT 4EVAR: 0');
app.stage.addChild(countingText);

var incr = 0;

function onButtonDown() {
	this.isdown = true;
	this.texture = textureButtonDown;
	this.alpha = 1;
}

function onButtonUp() {

	if (this.isOver && this.isdown) {

		coins = coins + clickAmount;
		countingText.text = coins + 'XDG';
		incr++;
		//window.alert(incr);
		this.texture = textureButtonOver;
	} else {
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
thing.x = 800 / 2;
thing.y = 600 / 2;

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
		Math.random() * 800, Math.random() * 600);
}

app.ticker.add(function () {
		
	count += 0.1;

	thing.clear();
	thing.lineStyle(10, 0xff0000, 1);
	thing.beginFill(0xffFF00, 0.5);

	thing.moveTo(-120 + Math.sin(count) * 20, -100 + Math.cos(count) * 20);
	thing.lineTo(120 + Math.cos(count) * 20, -100 + Math.sin(count) * 20);
	thing.lineTo(120 + Math.sin(count) * 20, 100 + Math.cos(count) * 20);
	thing.lineTo(-120 + Math.cos(count) * 20, 100 + Math.sin(count) * 20);
	thing.lineTo(-120 + Math.sin(count) * 20, -100 + Math.cos(count) * 20);

	thing.rotation = count * 0.1;
});
