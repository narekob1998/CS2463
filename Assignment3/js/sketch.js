let y = 100;
let speed = 0; 
let roar = 0.004; 
let on_and_off = false; 
var car = 
  {
    x: 0,
    g: 250
  };
  var sky = {
    col1: 255,
    col2: 220,
    col3: 0,
    col4: 150
  };

function setup() {
createCanvas(400, 400);
if(y > height) {
fill(255);
text("Start Moving!", width/2, height/2);
}

var noises = [];
var filters = [];
var totalSynths = 8;
  

for (var i = 0; i < totalSynths; i++) 
{
      filters[i] = new Tone.AutoFilter({
      frequency: "8m",
      min: 100,
      max: 15000,
      type: "square",
      filter: {
      type: "lowshelf",
      gain: 12,
      rolloff: -48,
      Q: 4
}
}).toDestination()

noises[i] = new Tone.NoiseSynth({
type: 'white',
"envelope": {
"attack": 3,
"decay": 2,
"sustain": 1,
"release": 3
}
}).connect(filters[i]);
}

launch = createButton("Start").mousePressed(() => {
  on_and_off = true;
for(var i = 0; i < totalSynths; i++) {
      noises[i].triggerAttackRelease("4m", `+${i}`);
      filters[i].frequency.rampTo(i*1.4,'8m')
      filters[i].filter.Q.setValueCurveAtTime([10, 15, 9, 1], '', '8m')
      noises[i].volume.setValueCurveAtTime([-30, -6, -10 ], '', '8m')
}
});
}

function draw() 
{
  background(0, sky.col2, sky.col1);
  CarImpl();
}
function CarImpl(){
  if (on_and_off  )
  {
     
     speed += roar;

  }
  car.x = car.x + speed;
	
	

	//the stars
	noStroke();
	fill(0, 220, 255, 140);
	ellipse(150, 80, 9, 8);
	ellipse(280, 60, 8, 9);
	ellipse(50, 180, 9, 9);
	ellipse(320, 150, 8, 8);

	//the sun or moon
	fill(255, 255, sky.col3);
	ellipse(50, 50, 60, 60);

	//concrete
	fill(sky.col4);
	rect(0, 250, 499, 250);

	//the car itself
	fill(0, car.g, 0);
	rect(car.x, 198, 110, 50, 20);
	fill(50);
	ellipse(car.x, 250, 40, 40);
	ellipse(car.x + 110, 250, 40, 40);
	
}