(function() {
  if (typeof Snake === "undefined") {
    window.Game = {};
  }

  var Snake = Game.Snake = function () {
    this.dir = "S";
    this.segments = [[5, 0], [4, 0], [3, 0], [2, 0], [1, 0], [0, 0]];
    this.keybinding();
  };

  Snake.prototype.tryToChange = function(newDirection) {

  }

  Snake.prototype.keybinding = function() {
    var snake = this;
    $("body").keydown(function(e) {
      switch(e.which) {
        case 37:
          if (snake.dir !== "E") {
            snake.dir = "W";
          }
        break;
        case 38:
          if (snake.dir !== "S") {
            snake.dir = "N";
          }
        break;
        case 39:
          if (snake.dir !== "W") {
            snake.dir = "E";
          }
        break;
        case 40:
          if (snake.dir !== "N") {
            snake.dir = "S";
          }
        break;
        default: return;
      }
      e.preventDefault();
    });
  };

  var Coord = Game.Coord = function (){};

  Coord.plus = function (arr1, arr2) {
    var result = [];
    result[0] = (arr1[0] + arr2[0] + 20) % 20;
    result[1] = (arr1[1] + arr2[1] + 20) % 20;

    return result;
  };

  Coord.equals = function (arr1, arr2) {
    if (arr1[0] !== arr2[0] || arr1[0] !== arr2[0]) {
      return false;
    }
    return true;
  };

  Coord.isOpposite = function (arr1, arr2) {
    // if (arr1[0] !== -arr2[0] || arr1[0] !== -arr2[0]) {
    //   return false;
    // }
    // return true;
  };

  Coord.DIRS = {
    "N": [-1,0],
    "E": [0, 1],
    "S": [1, 0],
    "W": [0,-1]
  };

  Snake.prototype.move = function () {
    var nextMove = Coord.plus(this.segments[0], Coord.DIRS[this.dir]);
    if (this.segments[1] !== nextMove) {
      this.segments.unshift(nextMove);
      return this.segments.pop();
    } else {
      return this.segments[0];
    }
  };

  var Board = Game.Board = function (snake) {
    this.snake = snake;
    this.coords = [];
    for (var i = 0; i < 20; i++) {
      this.coords.push([]);
      for (var j = 0; j < 20; j++) {
        this.coords[i].push(" . ");
      }
    }
    for (var k = 0; k < this.snake.segments.length; k++) {
      var snakePos = this.snake.segments[k];
      this.coords[snakePos[0]][snakePos[1]] = " S ";
    }
    this.render();
  };

  Board.prototype.render = function () {
    var string = "";

    var lastDeleted = this.snake.move();
    console.log(lastDeleted);
    var snakePos = this.snake.segments[0];
    this.coords[snakePos[0]][snakePos[1]] = " S ";
    this.coords[lastDeleted[0]][lastDeleted[1]] = " . ";

    this.coords.forEach( function (row) {
      row.forEach( function (col) {
        string += col;
      });
      string += "\n";
    });
    $('.container').html(string);
  };

})();
