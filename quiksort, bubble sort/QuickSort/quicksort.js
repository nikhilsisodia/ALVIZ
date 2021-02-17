let insertButton, sortButton;
let buttonEnabled = true;
let textBox;

var array = new Array();
var states = new Array();


let width, height;

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
        buttonEnabled = false;
        quickSort(0, array.length-1);
    }
    buttonEnabled = true;
}

function clearScr(){
  if (buttonEnabled) {
      buttonEnabled = false;
      while(array.length!=0){
        array.pop();
      }
      heightEqualizer = 20;
      barwidth=50;
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

  frameRate(FPS);

}

async function quickSort(start, end) {
  if (start >= end) {
    return;
  }
  let index = await partition(start, end);
  states[index] = -1;

  await Promise.all([
    quickSort(start, index - 1),
    quickSort(index + 1, end)
  ]);
//  console.log(array);
}

async function partition(start, end) {

  for (let i = start; i < end; i++) {
    states[i] = 1;
//    console.log(states);
  }

  let pivotValue = array[end];
  let pivotIndex = start;
  states[pivotIndex] = 0;
  for (let i = start; i < end; i++) {
    if (array[i] < pivotValue) {
      await swap(i, pivotIndex);
      states[pivotIndex] = -1;
      pivotIndex++;
      states[pivotIndex] = 0;
    }
  }
  await swap(pivotIndex, end);

  for (let i = start; i < end; i++) {
    if (i != pivotIndex) {
      states[i] = -1;
    }
  }

  return pivotIndex;
}

function draw() {

    background(255);
    stroke('#000000');
    strokeWeight(2);

    line(0, ((height/2)+ 302), windowWidth, ((height/2)+ 300));

    for (let i = 0; i < array.length; i++) {

      if (states[i] == 0) {

        stroke('#E0777D');
        strokeWeight(4);
      } else if (states[i] == 1) {

        stroke('#66ff33');
        strokeWeight(4);
      } else {

        stroke('#000000');
        strokeWeight(2);
      }

      if(((height/2) - (heightEqualizer*array[i]) + 300) < 120){
        heightRestructure();
      }
      if(i*barwidth + barwidth > windowWidth){
        widthRestructure();
      }

      rect((i * barwidth) , ((height/2) - (heightEqualizer*array[i]) + 300) , barwidth, (heightEqualizer*array[i]));


      textSize(heightEqualizer*1);
      strokeWeight(1);
      text(array[i], (i * barwidth) + 25 , ((height/2) + 292)  );
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
