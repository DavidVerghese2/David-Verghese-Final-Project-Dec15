var pan1 = 0;
var pansong1;
var speed1 = 0;
var speedsong1;
var pan2 = 0;
var pansong2;
var speed2 = 0;
var speedsong2;
var volsong1 = 0;
var volsong2 = 0;
var indvol1 = 0;
var indvol2 = 0;

var tempo1 = 127;
var tempo2 = 127;


var filterFreq1 = 50;
var filterRes1 = 400;

var filterFreq2 = 390;
var filterRes2 = 360;


var reverb;

var fft;

function preload() {
  song1 = loadSound("data/DeadMaus2.mp3");
  song2 = loadSound("data/Tiga2.mp3");

  image1 = loadImage("data/deadmau5.jpg");
  image2 = loadImage("data/tiga.jpg");

}

function setup() {

  createCanvas(1100, 600);
  background(7, 60, 1);

  fft = new p5.FFT();

  frameRate(10);


}

function draw() {


  background(7, 60, 1);

  image(image1, 600, 325, 70, 70);
  image(image2, 600, 405, 70, 70);

  fill(0);
  textFont("Georgia");
  textSize(15);
  text("DeadMau5, 'Some Chords (Dillon Francis Remix)'", 680, 350);
  text("Tiga, 'Make Me Fall In Love (Benny Benassi Remix)'", 680, 430);


  // APPLYING EFFECTS 
  
  // I would've liked to have added one more effect (eg: reverb/ delay), but this seem to make the 
  // program dramatically more laggy. 
  
  // Song 1: 
  fill(100, 30, 30); // volume for song 1.
  rect(15, 0, 70, 300);
  fill(0);
  rect(45, 0, 10, 300);
  fill(200, 200, 20);
  rect(25, indvol1, 50, 20);
  fill(0);
  textSize(13);
  text("Volume", 30, 320);
  var individualvolumesong1 = map(indvol1, -10, 300, 0, 1); // // Volume for Song 1. 
  song1.setVolume(individualvolumesong1);

  fill(100, 30, 30); // Panning for song 1. 
  rect(105, 0, 70, 300);
  fill(0);
  rect(135, 0, 10, 300);
  fill(200, 200, 20);
  rect(115, pan1, 50, 20);
  fill(0);
  textSize(13);
  text("Panning", 120, 320);

  fill(100, 30, 30); // the tempo/ speed of song 1:
  rect(195, 0, 70, 300);
  fill(0);
  rect(225, 0, 10, 300);
  fill(200, 200, 20);
  rect(205, speed1, 50, 20);
  fill(0);
  textSize(13);
  text("Speed", 210, 320);

  // Song 2: 
  
  fill(100, 30, 30); //The volume of song 2
  rect(375, 0, 70, 300);
  fill(0);
  rect(405, 0, 10, 300);
  fill(200, 200, 20);
  rect(385, indvol2, 50, 20); // volume 2
  fill(0);
  textSize(13);
  text("Volume", 390, 320);
  var individualvolumesong2 = map(indvol2, 0, 300, 0, 1); // // Volume for Song 2. 
  song2.setVolume(individualvolumesong2);

  fill(100, 30, 30); // The panning of song 2. 
  rect(465, 0, 70, 300);
  fill(0);
  rect(495, 0, 10, 300);
  fill(200, 200, 20);
  rect(475, pan2, 50, 20);
  fill(0);
  textSize(13);
  text("Panning", 480, 320);

  fill(100, 30, 30); // The speed/ tempo of Song 2
  rect(555, 0, 70, 300);
  fill(0);
  rect(585, 0, 10, 300);
  fill(200, 200, 20);
  rect(565, speed2, 50, 20);
  fill(0);
  textSize(13);
  text("Rate", 570, 320);


  fill(20, 20, 20); // This is a graph that adds a filter effect to Song 1
  rect(50, 350, 200, 200);
  fill(100);
  rect(filterFreq1, filterRes1, 10, 10);
  fill(240);
  text("Frequency", 190, 375);
  text("Resonance", 50, 545);
  filter = new p5.LowPass();
  song1.disconnect();
  song1.connect(filter);
  filterFreqA = map(filterFreq1, 50, 300, 10, 2000);
  filterResA = map(filterRes1, 350, 540, 15, 1);
  filter.set(filterFreqA, filterResA);

  fill(20, 20, 20); // This is a graph that adds a filter effect to song 2. 
  rect(380, 350, 200, 200);
  fill(100);
  rect(filterFreq2, filterRes2, 10, 10);
  fill(240);
  text("Frequency", 520, 375);
  text("Resonance", 380, 545);
  filter2 = new p5.LowPass();
  song2.disconnect();
  song2.connect(filter2);
  filterFreqB = map(filterFreq2, 380, 570, 10, 20000);
  filterResB = map(filterRes2, 350, 540, 20, 1);
  filter2.set(filterFreqB, filterResB);

  var pansong1 = map(pan1, -20, 250, -1, 1); // // APPLYING EFFECTS, Song 1
  song1.pan(pansong1);
  var speedsong1 = map(speed1, 0, 250, 1, 3); // changing the rate changes the pitch too
  song1.rate(speedsong1);
  var tempoupdate = (tempo1 * speedsong1); // The exact tempo of the song is displayed on the far right
  fill(0);
  textSize(13);
  text("Bpm:", 700, 375);
  text(tempoupdate, 750, 375);

  var pansong2 = map(pan2, -20, 250, -1, 1); // // APPLYING EFFECTS, Song 2
  song2.pan(pansong2);
  var speedsong2 = map(speed2, 0, 250, 1, 3); // changing the rate changes the pitch too
  song2.rate(speedsong2);
  var tempoupdate2 = (tempo2 * speedsong2); // The exact tempo of the song is displayed on the far right
  fill(0);
  textSize(13);
  text("Bpm:", 700, 455);
  text(tempoupdate2, 750, 455);

  //CREATING THE VISUALIZATION
 
  var waveform = fft.waveform(); 

  fill(0);
  rect(675, 25, 350, 250);
  fill(255);
  rect(700, 50, 300, 200);

  push();
  fill(0);
  beginShape();
  strokeWeight(5);
  for (var i = 0; i < waveform.length; i++) {
    var x = map(i, 0, waveform.length, 700, 1000);
    var y = map(waveform[i], -1, 1, 50, 250);
    vertex(x, y);
  }
  endShape();
  pop();

  push();
  fill(20, 100, 100);
  beginShape();
  strokeWeight(5);
  for (var i = 0; i < waveform.length; i++) {
    var x = map(i, 0, waveform.length, 700, 1000);
    var y = map(waveform[i], -1, 1, 100, 200);
    vertex(x, y);
  }
  endShape();
  pop();

  push();
  fill(120, 10, 100);
  beginShape();
  strokeWeight(5);
  for (var i = 0; i < waveform.length; i++) {
    var x = map(i, 0, waveform.length, 700, 1000);
    var y = map(waveform[i], -1, 1, 125, 175);
    vertex(x, y);
  }
  endShape();
  pop();
  
  // STARTING AND STOPPING SOUND FILES. 
  
  fill(20, 3, 112);
  rect(780, 360, 45, 20);
  fill(0);
  text("start", 790, 375);
  fill(20, 3, 112);
  rect(830, 360, 45, 20);
  fill(0);
  text("pause", 840, 375);
  fill(20, 3, 112);
  rect(780, 440, 45, 20);
  fill(0);
  text("start", 790, 450);
  fill(20, 3, 112);
  rect(830, 440, 45, 20);
  fill(0);
  text("pause", 840, 450);
  console.log(mouseY);
}

// CREATING THE "SLIDERS"

function mouseDragged() { 
  if ((mouseX > 50) && (mouseX < 240) && (mouseY > 350) && (mouseY < 540)) { // Graph 1
    filterFreq1 = mouseX;
    filterRes1 = mouseY;
  }
  if ((mouseX > 380) && (mouseX < 570) && (mouseY > 350) && (mouseY < 540)) { // Graph 2
    filterFreq2 = mouseX;
    filterRes2 = mouseY;
  }
  if ((mouseX > 25) && (mouseX < 115) && (mouseY > -20) && (mouseY < 250)) { // Volume Song 1
    indvol1 = mouseY;
  }
  if ((mouseX > 115) && (mouseX < 205) && (mouseY > 0) && (mouseY < 250)) { // Pan 1
    pan1 = mouseY;
  }
  if ((mouseX > 205) && (mouseX < 295) && (mouseY > -20) && (mouseY < 250)) { // Rate Song 1
    speed1 = mouseY;
  }


  if ((mouseX > 385) && (mouseX < 475) && (mouseY > -20) && (mouseY < 250)) { // Volume Song 2
    indvol2 = mouseY;
  }
  if ((mouseX > 475) && (mouseX < 565) && (mouseY > -20) && (mouseY < 250)) { // Panning Song 2
    pan2 = mouseY;
  }
  if ((mouseX > 565) && (mouseX < 655) && (mouseY > -20) && (mouseY < 250)) { // Rate Song 2
    speed2 = mouseY;
  }
}

// THE START/ STOP BUTTONS

function mouseClicked() {
  if ((mouseX > 780) && (mouseX < 825) && (mouseY > 360) && (mouseY < 380)) {
    song1.loop();
  }
  if ((mouseX > 830) && (mouseX < 875) && (mouseY > 360) && (mouseY < 380)) {
    song1.pause();
  }
  if ((mouseX > 780) && (mouseX < 825) && (mouseY > 440) && (mouseY < 460)) {
    song2.loop();
  }
  if ((mouseX > 830) && (mouseX < 875) && (mouseY > 440) && (mouseY < 460)) {
    song2.pause();
  }
}