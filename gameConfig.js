var data;
var Pcolors = [
    [255, 0, 0],
    [0, 0, 255],
    [0, 255, 0],
    [255, 255, 255],
    [255, 125, 125],
  ];;
var nPlayers;
var rows;
var cols;
var margin = 10;
var size;
var margin2;
var matrix = [];
var isPressed;
var player;
var isok;
var dBalls = [];
var myID = 0;
var duplicate = [];
var moves = [];
var isRun;
var played;
var some;
var RemPlayers;
async function preload() {
  // Load data before the sketch starts
  return new Promise((resolve, reject) => {
    game
      .once("value")
      .then((snapshot) => {
        data = snapshot.val();
        nPlayers = parseInt(data.players);
        rows = parseInt(data.grid);
        cols = parseInt(rows * 0.6);
        size = (600 - margin * 2) / rows;
        margin2 = (400 - size * cols) / 2;
        matrix = data.matrix;
        console.log(matrix)
        isPressed = false;
        isok = false;
        player = data.player;
        isRun = false;
        some = false;
        RemPlayers = data.RemPlayers;
        for (i = 0; i < cols; i++) {
          dBalls[i] = [];
          for (j = 0; j < rows; j++) {
            dBalls[i][j] = new Gola(i, j);
          }
        }
        setTimeout(() => { // Set a default value for player
          }, 1000);
        console.log(data);
        resolve();
      })
      .catch((error) => {
        console.error("Error fetching game data:", error);
        reject(error);
      });
  });
}
var myID = 1;
game.child('click').on('value', (snapshot) => {
    click = snapshot.val();
    if(click != null){
      if(click.player != myID){
        matrix[click.click[0]][click.click[1]].balls++;
        matrix[click.click[0]][click.click[1]].player = click.player;
        if(played<=nPlayers+1){
            played++;
        }
        isok = true;
        some = true;
        check();
      }
    }

});