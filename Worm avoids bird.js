/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: Worm avoids bird
@author: 
@tags: []
@addedOn: 2024-00-00
*/

const player = "p" 
const obstacle = "o" 



setLegend(
  [player, bitmap`
8888............
8228............
802888..........
80288888........
8228.8888.......
8888..8888......
.......888......
.......888......
.......888......
......8888......
......8888......
.....8888......8
.....88888....88
......8888888888
.........8888888
.........888888.`], 
  [ obstacle, bitmap`
...000..........
..05550.........
.096050.........
09666550........
.00055550.......
...055550.......
..05555550......
.0555555550.....
.0555555550.....
.05555555550....
..05555555550...
...0055555550...
....00000000....
....0.....0.....
...000...000....
...000...000....` ], 
)

const melody = tune `
500: A4~500 + B4~500 + D5~500 + E5~500,
500: E4~500 + E5~500 + G5^500,
500: B4/500 + A5-500 + D5~500,
500: E5/500 + F4/500 + E4/500 + A4-500,
500,
500: A4/500 + G5/500 + F4-500 + D5~500 + D4~500,
500: B4-500 + D5~500,
500: B4~500 + G5^500,
500: E4/500 + F5-500 + G4~500 + B5~500,
500: D5~500,
500: B5/500 + C5/500 + C4~500 + G5~500 + F5^500,
500: F4/500 + A4~500,
500: C5-500 + C4~500 + F5~500 + E4^500,
500: E5/500 + F5/500 + G4/500 + C5~500 + C4~500,
500: F5^500,
500: D4-500 + E5~500 + A4^500,
500: B4/500 + F4-500 + D4-500 + G5-500 + E5~500,
500: B4/500 + A5-500 + D5-500,
500: E4/500 + G5~500,
500: B4~500 + G4^500,
500: A4/500 + E5/500,
500: E4-500 + F5~500,
500: A5~500 + D5~500,
500: C5/500 + F4~500 + B4~500 + E4~500,
500,
500: G5/500 + E4/500 + F4^500,
500: B4-500 + D4~500 + E5~500 + F4^500,
500: A4~500 + B4~500 + F5~500 + C4^500,
500: F4/500 + C5/500 + D5/500,
500: A5/500,
500: D4-500 + B4-500 + F5~500 + E5^500,
500: C5~500 + E5^500`;

playTune(melody, Infinity);
setSolids([])

setMap(map`
........
........
........
........
........
........
........
...p....`);

var gameRunning = true;
 
onInput("a", () => {
  if (gameRunning) {
    getFirst(player).x -= 1; 
  }
});
 
onInput("d", () => {
  if (gameRunning) {
    getFirst(player).x += 1; 
  }
});
 
function spawnObstacle() {
  let x = Math.floor(Math.random() * 8);
  let y = 0;
  addSprite(x, y, obstacle);
}
 
function moveObstacles() {
  let obstacles = getAll(obstacle);
 
  for (let i = 0; i < obstacles.length; i++) {
    obstacles[i].y += 1;
  }
}
 
function despawnObstacles() {
  let obstacles = getAll(obstacle);
 
  for (let i = 0; i < obstacles.length; i++) {
   if (obstacles[i].y == 7) {
     obstacles[i].remove();
   }
  }
}
 
function checkHit() {
  let obstacles = getAll(obstacle);
  let p = getFirst(player);
 
  for (let i = 0; i < obstacles.length; i++) {
    if (obstacles[i].x == p.x && obstacles[i].y == p.y) {
      return true;
    }
  }
 
  return false;
}
var gameLoop = setInterval(() => {
  despawnObstacles();
  moveObstacles();
  spawnObstacle();
 
  if (checkHit()) {
    clearInterval(gameLoop);
    gameRunning = false;
    addText("Game Over!", {
      x: 5,
      y: 6,
      color: color`3`
    });
  }
 
}, 1000);