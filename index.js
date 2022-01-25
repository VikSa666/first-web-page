var image = null;
var fileInput = null;


function uploadImage() {
  var canvas = document.getElementById("can1");
  fileInput = document.getElementById("input");
  image = new SimpleImage(fileInput);
  output = new SimpleImage(fileInput);
  image.drawTo(canvas);
}

function ifImageIsLoaded(image) {
  if(image == null || !image.complete()) {
    alert("Image is not loaded");
    return false;
  }
  return true;
}

//function resetOutput() {
//  var x1 = image.getWidth();
//  var y1 = image.getHeight();
//  output = new SimpleImage(x1,y1);
//  for (var pixel of image.values()) {
//    var x = pixel.getX();
//    var y = pixel.getY();
//    output.setRed(x,y,pixel.getGreen());
//    output.setGreen(x,y,pixel.getGreen());
//    output.setBlue(x,y,pixel.getBlue());
//  }
//}

function resetImage() {
  var imgcanvas = document.getElementById("can2");
  image = new SimpleImage(fileInput);
  image.drawTo(imgcanvas);
}


function makeGray() {
  
  if(ifImageIsLoaded(image)) { 
  
    for( var pixel of image.values()) {
      var avg = (pixel.getRed() + pixel.getGreen() + pixel.getBlue() ) / 3;
      pixel.setRed(avg);
      pixel.setGreen(avg);
      pixel.setBlue(avg);
    }
    var imgcanvas = document.getElementById("can2");
    image.drawTo(imgcanvas);
    image = new SimpleImage(fileInput);
  }
}


function clearCanvases() {
  var canvas1 = document.getElementById("can1");
  var canvas2 = document.getElementById("can2");
  var context1 = canvas1.getContext("2d");
  var context2 = canvas2.getContext("2d");
  
  context1.clearRect(0,0, canvas1.width,canvas1.height);
  canvas1.style.backgroundColor = "rgba(255,255,255,0)";
  context2.clearRect(0,0, canvas2.width,canvas2.height);
  canvas2.style.backgroundColor = "rgba(255,255,255,0)";
}


//  COLOR FUNCTIONS

function makeRed() {
  
  if(ifImageIsLoaded(image)) {
    for( var pixel of image.values()) {
      var k = (pixel.getRed() + pixel.getBlue() + pixel.getGreen()) / 3;
      if(k < 128) {
        pixel.setRed(2*k);
        pixel.setGreen(0);
        pixel.setBlue(0);
      } else {
        pixel.setRed(255);
        pixel.setGreen( 2*k - 255);
        pixel.setBlue(2*k - 255);
      }
    }
    var imgcanvas = document.getElementById("can2");
    image.drawTo(imgcanvas);
  }
  image = new SimpleImage(fileInput);
}
function makeGreen() {
  
  if(ifImageIsLoaded(image)) {
    for( var pixel of image.values()) {
      var k = (pixel.getRed() + pixel.getGreen() + pixel.getBlue())/3;
      if (k < 128) {
        pixel.setRed(0);
        pixel.setGreen(2*k);
        pixel.setBlue(0);
      } else {
        pixel.setRed(2*k - 255);
        pixel.setGreen(255);
        pixel.setBlue(2*k-255);
      }
    }
    var imgcanvas = document.getElementById("can2");
    image.drawTo(imgcanvas);
  }
  image = new SimpleImage(fileInput);
}
function makeBlue() {
  
  if(ifImageIsLoaded(image)) {
    for( var pixel of image.values()) {
      var k = (pixel.getRed() + pixel.getGreen() + pixel.getBlue())/3;
      if (k < 128) {
        pixel.setRed(0);
        pixel.setGreen(0);
        pixel.setBlue(2*k);
      } else {
        pixel.setRed(2*k - 255);
        pixel.setGreen(2*k - 255);
        pixel.setBlue(255);
      }
    }
    var imgcanvas = document.getElementById("can2");
    image.drawTo(imgcanvas);
  }
  image = new SimpleImage(fileInput);
}



function doBrighter() {
  var sliderinput = document.getElementById("sldr");
  var len = sliderinput.value;
  var canvas = document.getElementById("c2");
  var context = canvas.getContext("2d");
  context.clearRect(0,0,canvas.width,canvas.height);
  context.fillStyle = "yellow";
  context.fillRect(10,10,len,len);
  context.fillRect(parseInt(len)+20,10,len,len);
  context.fillRect(len*3,10,len,len);
}


function makeBrighter() {
  if(ifImageIsLoaded(image)) {
    var sliderinput = document.getElementById("sldr");
    var len = sliderinput.value;
    for(var pixel of image.values()) {
      var k = (pixel.getRed() + pixel.getGreen() + pixel.getBlue())/3;
      var c = (len/100 - 0.5) * k;
      pixel.setRed(pixel.getRed() + c);
      pixel.setGreen(pixel.getGreen() + c);
      pixel.setBlue(pixel.getBlue() + c);
    }
    
    var imgcanvas = document.getElementById("can2");
    image.drawTo(imgcanvas);
  }
}


function makeContrast() {
  if(ifImageIsLoaded) {
    var sliderinput = document.getElementById("sldr2");
    var len = sliderinput.value;
    for(var pixel of image.values()) {
      var k = (pixel.getRed() + pixel.getGreen() + pixel.getBlue())/3;
      var c = (len/100 - 0.5) * k;
      if(k >= 128) {
        pixel.setRed(pixel.getRed() + c);
        pixel.setGreen(pixel.getGreen() + c);
        pixel.setBlue(pixel.getBlue() + c);
      } else {
        pixel.setRed(pixel.getRed() - c);
        pixel.setGreen(pixel.getGreen() - c);
        pixel.setBlue(pixel.getBlue() - c);
      }
    }
    var imgcanvas = document.getElementById("can2");
    image.drawTo(imgcanvas);
  }
}

//  cxy contains the coordinates and size will be the size of the image
function checkInImage(cxy, size) {
  if(cxy < 0) {
    return 0;
  } else {
    if(cxy >= size) {
      return size - 1;
    } else {
      return cxy;
    }
  }
}

//  x and y will be the coordinates of the pixel we have as "center"
function randomPixel(x,y){
  var r = 10;
  var rx = Math.random()*2*r - r;
  var ry = Math.random()*2*r - r;
  x = checkInImage(x+rx, image.getWidth());
  y = checkInImage(y+ry, image.getHeight());
  var pixel = image.getPixel(x,y);
  return pixel;
}

function blurFunction() {
  for (var pixel of image.values()) {
    var x = pixel.getX();
    var y = pixel.getY();
    if (Math.random() < 0.5) {
      var newPixel = randomPixel(x,y);
      image.setPixel(x,y,newPixel);
    }
  }
}

function makeBlur() {
  if(ifImageIsLoaded(image)) {
    blurFunction();
    var imgcanvas = document.getElementById("can2");
    image.drawTo(imgcanvas);
  }
  image = new SimpleImage(fileInput);
}