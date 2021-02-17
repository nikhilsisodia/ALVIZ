let insertButton, sortButton;
let buttonEnabled = true;
let textBox;

var sortingInProcess = false;
var startXCoord;
var xCordSort;
var arrayOfArrays = new Array();
var array = new Array();
var states = new Array();
var xCordOfAOA = new Array();    // stores the x coordinates of the parent array
var TNAL = 0;                   //total no. of arrays in a level


let width, height;
let levelGap = 100;

var heightEqualizer = 20;
var barwidth=50;


var awaitTime = 500;
awaitTime = prompt("Please enter the time to wait for next operation\nMore the time, slow the visualisation\nIf don't know what to put leave default", 500);
let FPS = 60;

function insertNode() {
    if (buttonEnabled) {
        buttonEnabled = false;

        let value = parseInt(textBox.value());
        textBox.value('');

        if (!isNaN(value)) {
            array.push(value);
            states.push(-1);
            startXCoord -=25;
//            console.log(array);
//            console.log(states);
        }

        else{
            alert('Please enter an integer.');
        }


    }
    buttonEnabled = true;
}

function sortNode() {
    if (buttonEnabled) {
        sortingInProcess = true;
        buttonEnabled = false;

        xCordSort = startXCoord;


        arrayOfArrays.push(array);
        array = mergeSort(0, array.length-1);

    }
    buttonEnabled = true;
    sortingInProcess = false;
}

function clearScr(){
  if (buttonEnabled) {
      buttonEnabled = false;
      while(array.length!=0){
        array.pop();
      }
  }
  buttonEnabled = true;
}


function setup() {
  let FPS = 7;
  width = windowWidth;
  height = windowHeight;

  createCanvas(width, height);

  textAlign(CENTER, CENTER);

//  toggleButton = createButton('BST');
  insertButton = createButton('Insert');
  sortButton = createButton('Sort');
  clearButton = createButton('Clear');
  textBox = createInput(6);

  let elements = [textBox, insertButton, sortButton, clearButton];


  let w = 94.52;
  let h = 81.95;
  let x = 508.06;
  let y = 18.05;

  for (let element of elements) {
      element.size(w, h);
      element.position(x, y);
      element.style('font-size', h/5 + 'px');
      element.style('text-align', 'center');

      x += 1.5*w;

  }
//  toggleButton.mousePressed(toggleTree);
  insertButton.mousePressed(insertNode);
  sortButton.mousePressed(sortNode);
  clearButton.mousePressed(clearScr);
  textBox.elt.focus();

  startXCoord = windowWidth/2;
  frameRate(FPS);

}

function mergeSort(){
  arrayOfArrays.push(array);
}



function draw() {

    background(255);

    if(!sortingInProcess){

      for(let i = 0; i<array.length; i++){
        var x = startXCoord + i*50
        stroke('#000000');
        strokeWeight(2);
        rect(x, 150, 50, 50);
        textSize(15);
        strokeWeight(1);
        text(array[i], startXCoord + (i*50) + 25 ,175);

      }

    }

    else{

      var lastidx = 0;
      var levelYCord = 150;
      var levelXCord = xCordSort

      for (lev = 0; lev<level; lev++ ){             //lev --> Current level

        var noi = Math.pow(2, lev);                 // noi --> No.Of Iteration in a level 2 to the power level
        var mid = arrayOfArrays[lastidx].length * 25;

        for(let i = lastidx; i< noi; i++){

          let arr = arrayOfArrays[i] ;
          var x = levelXCord;

          for(let j = 0; j<arr.length; j++){

            stroke('#000000');
            strokeWeight(2);
            rect(x, levelYCord, 50, 50);
            textSize(15);
            strokeWeight(1);
            text(array[i], x + 25 ,levelYCord+25);
            x+=50;

          }

          if(arr.length===1){
            noi-=2;
          }

          gap =+
        }

        levelXCord -= mid;
        levelYCord += levelGap;                     // increasing the y-Coordinate for the new level
        lastidx = noi;                              // setting the last index so that next time arrayOfArrays starts is fetched from there

      }

    }

}

async function swap(a, b) {
  await sleep(awaitTime);
  let temp = array[a];
  array[a] = array[b];
  array[b] = temp;
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function widthRestructure(){
   barwidth*=0.8;
}

function heightRestructure(){
   heightEqualizer*=0.98;
}

function mousePressed() {
  noLoop();
}

function mouseReleased() {
  loop();
}
