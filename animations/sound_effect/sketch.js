

var index = 0;
var time = 0;
var inc = 0.01;

var wanted_width = window.innerWidth;
var wanted_height = 150;

var data_resolution = 2;



function setup() {
	createCanvas(wanted_width, wanted_height);
  myLoop();


}

function myLoop () {           
	setTimeout(function () {
   // Code is here

    // get the spectrum
    if (index >= data.length){index = 0;} //reset the animation at the end
    var spectrum = data[index];
    index++;
    
    // initialize things
    background(0);
    colorMode(HSB, 255, 255, 255);
  

    let yoff = 1;
    loadPixels();

    for (let x_data = 0; x_data < data.length; x_data += data_resolution) {
    	var min_bef = 0;
    	var max_bef = data.length - 40;
    	var min_aft = 0;
    	var max_aft = wanted_width;
    	var new_x = Math.round(map(x_data, min_bef, max_bef, min_aft, max_aft));
    	// console.log(x);
    	// var new_x = 5;

      let xoff = 1;
      let bar_height = map(Math.round(spectrum[x_data]), -150, 50, wanted_height, 0);
      let col = color(map(new_x, 0, wanted_width, 0, 235), 255, 255);
      let r = red(col);
      let g = green(col);
      let b = blue(col)


      for (let y = 0; y < bar_height; y++){
        let inverted_y = height - y;
        let index = (new_x + 7 + inverted_y * wanted_width) * 4;
        // noiseDetail(8, 0.65)
        let n = noise(xoff, yoff, time);
        // n = 0.9;
        pixels[index + 0] = r * (n+0.5);
        pixels[index + 1] = g * (n+0.5);
        pixels[index + 2] = b * (n+0.5);
        xoff += inc;
      }
    	yoff += inc;
  	} 
    time += 0.1;
    updatePixels();

      // call the function again
      myLoop();

   }, 50) // delay before executing the function
}

function resize(){
	wanted_width = window.innerWidth;
	wanted_height = 150;
	resizeCanvas(wanted_width, wanted_height, true)
}