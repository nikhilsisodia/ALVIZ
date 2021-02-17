var rows, cols;

var grid = [];
var current;
var stack = [];
//var w = 60;
function setup() {
    createCanvas(windowWidth/1.5, windowHeight/1.5);
    cols = floor(width/60);
    rows = floor(height/60);
    frameRate(5);
    for (var j = 0; j<rows; j++){
        for (var i = 0; i < cols; i++) {
            var cell = new Cell(i,j);
            grid.push(cell);
        }
    }
    current = grid[0];
}
function draw(){
    background(51);
    for (var i = 0; i<grid.length; i++){
        grid[i].show();
    }
    current.visited = true;
    current.highlight();
    var next = current.checkNeighbours();
    if (next) {
        next.visited = true;
        stack.push(current);
        removeWalls(current,next);
        current = next;
    }
    else if(stack.length > 0){
        current = stack.pop();
    }
}
function index(i,j){
    if (i < 0 || j < 0 || i > cols-1 || j > rows-1) {
        return -1;
    }
    return i + j * cols;
}
function Cell(i,j){
    this.i = i;
    this.j = j;
    this.walls = [true,true,true,true];
    this.visited = false;
    this.checkNeighbours = function(){
        var neighbours = [];
        var top =       grid[index(i, j-1)];
        var right =     grid[index(i+1, j)];
        var bottom =    grid[index(i, j+1)];
        var left =      grid[index(i-1, j)];
        if (top && !top.visited){
            neighbours.push(top);
        }
        if (right && !right.visited){
            neighbours.push(right);
        }
        if (bottom && !bottom.visited){
            neighbours.push(bottom);
        }
        if (left && !left.visited){
            neighbours.push(left);
        }
        if (neighbours.length > 0){
            var r = floor(random(0, neighbours.length));
            return neighbours[r];
        }
        else{
            return undefined;
        }
    }
    this.highlight = function(){
        x = this.i*60;
        y = this.j*60;
        noStroke();
        fill(255,0,200,200);
        rect(x,y,60,60);
    }
    this.show = function(){
        x = this.i*60;
        y = this.j*60;
        stroke(255);
        if (this.walls[0]){
            line(x   ,y    ,x+60 ,y);
        }   
        if (this.walls[1]){
            line(x+60 ,y    ,x+60 ,y+60);
        }
        if (this.walls[2]){
            line(x+60 ,y+60 ,x   ,y+60);
        }
        if (this.walls[3]){
            line(x   ,y+60  ,x   ,y)
        }   
        if (this.visited) {
            noStroke();
            fill(100,0,255,100);
            rect(x,y,60,60);
        }
    }
}
function removeWalls(a,b){
    var x = a.i - b.i;
    if (x === 1){
        a.walls[3] = false;
        b.walls[1] = false;
    }
    else if (x === -1){
        a.walls[1] = false;
        b.walls[3] = false; 
    }
    var y = a.j - b.j;
    if (y === 1){
        a.walls[0] = false;
        b.walls[2] = false;
    }
    else if (y === -1){
        a.walls[2] = false;
        b.walls[0] = false; 
    }   
}