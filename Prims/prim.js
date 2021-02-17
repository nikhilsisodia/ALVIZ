
// YELLOW NODES ARE LEAF NODES AND THE FIRST NODE IS SELECTED AT RANDOM THAN IT START MAKEING PRIM SPANNING TREE .HERE YOU CAN ADD POINTS WHICH WILL GENERATE NEW MST.


// all nodes and all connections are arrays that store nodes and connections

var allnodes = [];
var allconnections = [];

// NODE is a constructor that initializes isreached and isleaf
function NODE(location) {

  this.isreached = false;
  this.location = location;
  this.isleaf = true;
}

// connect is a constructor that initializes no1,no2 as newconnectedNode and connectingNode
function connection(newConnectedNode, connectingNode) {
  this.no1 = newConnectedNode;
  this.no2 = connectingNode;

  connectingNode.isleaf = false;
}



// application of p5.js to create the canvas and nodes
function setup() {
  createCanvas(600, 600);

  for (var i = 0; i < 5; i++) {
    allnodes.push(new NODE(createVector(random(width), random(height))));
  }

  minimum_spanning_tree();
}
// Draws background and calls helpers functions
function draw() {
  background(255,0,200);
  drawnodes();
  drawconnections();

}

// to add additinal nodes to current canvas 
function mousePressed() {
  allnodes.push(new NODE(createVector(mouseX, mouseY)));
  minimum_spanning_tree();
}

// Drawing nodes
function drawnodes() {
  allnodes.forEach(function(node) {
    noStroke();
    var size = 14;

    if(node.isreached) {
      fill(0,220,0);
      if(node.isleaf) {
        stroke(0);
        size = 30;
        fill(255,200,0);
      }
    } else {
      fill(220,0,0);
    }
    ellipse(node.location.x, node.location.y, size, size);
  });
}

function drawconnections() {
  allconnections.forEach(function(connect) {

    stroke(0);
    fill(0);
    line(connect.no1.location.x, connect.no1.location.y, connect.no2.location.x, connect.no2.location.y);
  });
}

// implementation of prim's algo for minimum spanning tree
function minimum_spanning_tree() {
  var visited = [];
  var unvisited = allnodes.slice();

  // setting the initial state
  allconnections = [];
  allnodes.forEach(function(node) {
    node.isreached = false;
    node.isleaf = true;
  });

  // selecting first node randomly and then moving forword
  var firstnode = unvisited.splice(random(unvisited.length), 1)[0];
  firstnode.isreached = true;
  visited.push(firstnode);

  // this function is calculating the score which is the minimum distance and implementing the distance accordingly
  function calculateconnection() {
    var score = height;
    var closestNode, connectingNode;

    visited.forEach(function(reachedNode) {
      unvisited.forEach(function(unreachedNode) {
        var d = dist(reachedNode.location.x, reachedNode.location.y, unreachedNode.location.x, unreachedNode.location.y);

        if (d < score) {
          score = d;
          closestNode = unreachedNode;
          connectingNode = reachedNode;
        }
      });
    });

    allconnections.push(new connection(closestNode, connectingNode));
    closestNode.isreached = true;
    visited.push(unvisited.splice(unvisited.indexOf(closestNode), 1)[0]);
  }

  // fast track  calculations in a sequence
  function do_calculation() {
    if (unvisited.length > 0) {
      calculateconnection();
      setTimeout(do_calculation, 600);
    } else {
      console.log("completed");
    }
  }

  // Bootstrap the calculation
  do_calculation();
}